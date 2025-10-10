import express from "express";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import { z } from 'zod';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4999;

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
  });
}


const personalInfoSchema = z.object({
  family_name: z.string().min(1).max(80),
  first_name: z.string().min(1).max(80),
  middle_name: z.string().max(80).optional().nullable(),
  passport_no: z.string().min(1).max(20),
  selected_nationality: z.any(),
  occupation: z.string().min(1).max(80),
  gender: z.string().min(1),
  visa_no: z.string().max(80).optional().nullable(),
  selected_country: z.any(),
  selected_city: z.any(),
  phone_no_code: z.string().min(1).max(5),
  phone_no: z.string().min(4).max(17),
  date_of_birth: z.string().min(1)
});

app.post("/api/personal-info", async (req, res) => {
  const flattenedData = {
    ...req.body,
    nationality: req.body.selected_nationality?.country || '',
    country_of_residence: req.body.selected_country?.country || '',
    city_of_residence: req.body.selected_city || '',
  };

  const validation = personalInfoSchema.safeParse(flattenedData);

  if (!validation.success) {
    const errors = validation.error.errors.reduce((acc, err) => {
      acc[err.path.join('.')] = err.message;
      return acc;
    }, {});
    return res.status(400).json({ success: false, errors });
  }

  const { data, error } = await supabase
    .from('profiles')
    .insert([validation.data]);

  if (error) {
    console.error("Supabase error:", error.message);
    return res.status(500).json({ success: false, error: error.message });
  }

  res.status(200).json({ success: true, data });
});

const tripAccommodationSchema = z.object({
  date_of_arrival: z.string().min(1),
  selected_country: z.string().min(1),
  purpose_of_travel: z.string().min(1),
  purpose_other: z.string().optional(),
  mode_of_travel: z.string().min(1),
  mode_of_transport: z.string().min(1),
  mode_of_transport_other: z.string().optional(),
  flight_no: z.string().min(1),
  date_of_departure: z.string().min(1),
  dep_mode_of_travel: z.string().min(1),
  dep_mode_of_transport: z.string().min(1),
  dep_mode_of_transport_other: z.string().optional(),
  dep_flight_no: z.string().min(1),
  type_of_accommodation: z.string().min(1),
  type_other: z.string().optional(),
  province: z.string().min(1),
  district: z.string().min(1),
  sub_district: z.string().min(1),
  post_code: z.string().min(4),
  address: z.string().min(1)
});

app.post("/api/trip-info", async (req, res) => {
  const validation = tripAccommodationSchema.safeParse(req.body);

  if (!validation.success) {
    const errors = validation.error.errors.reduce((acc, err) => {
      acc[err.path.join('.')] = err.message;
      return acc;
    }, {});
    return res.status(400).json({ success: false, errors });
  }

  const { data, error } = await supabase
    .from('trip_information')
    .insert([validation.data]);

  if (error) {
    console.error("Supabase error:", error.message);
    return res.status(500).json({ success: false, error: error.message });
  }

  res.status(200).json({ success: true, data });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
