const express = require("express");
const dotenv = require("dotenv");
const { createClient } = require("@supabase/supabase-js");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path= require("path");
const fs = require("fs");

require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT || 4999;