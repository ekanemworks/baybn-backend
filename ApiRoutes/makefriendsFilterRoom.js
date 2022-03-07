const express = require('express');
const router = express.Router();
const mysql = require('mysql');
var cors = require('cors');
var bodyparser = require('body-parser');
var multer = require('multer');
var upload = multer({ dest: 'image/' })

router.use(cors()); 
router.use(bodyparser.json());


const date = require('date-and-time');
const md5 = require('md5');
const { v4: uuidv4 } = require('uuid');
const nodemailer = require('nodemailer');


// DATABASE CONNECTION
var DATABASE_CONNECTION = require('../dbConnection');
var mysqlConnectionfidsbay = (DATABASE_CONNECTION);

router.use(cors()); 
        


        router.post('/default', (req,res) => {

            // console.log(req.body);
            var _gender = req.body.gender;
            var _school = req.body.school;
            var _country = req.body.country;
            var _profiletype = req.body.profiletype;
            var _interests = req.body.interests;
            var _session = req.body.session;
            var sql_interests = ''

            // WHEN GENDER IS EVERYONE
            // WHEN GENDER IS EVERYONE
            // WHEN GENDER IS EVERYONE
            // WHEN GENDER IS EVERYONE
            // WHEN GENDER IS EVERYONE
            // WHEN GENDER IS EVERYONE
            if ((_gender != 'Male')&&(_gender!='Female')) {


                // UNDERSTANDING == MEANS 0
                // UNDERSTANDING != MEANS 1
                if (
                    (_school != '' && _school != 'University / School') &&
                    (_country != '' && _country != 'Country') &&
                    (_profiletype != '' && _profiletype != 'Profile Type') &&
                    (_interests != '' && _interests != 'Interest')
                    )
                {
                    // CASE 1 EVERYBODY HAS VALUE S:1 C:1 P:1 I:1
                    // when condition has !=, 1 then sql is = OR (LIKE for interest)
                    // when condition has ==, 0 then sql is != OR (= for interest)
                    sql_interests = "SELECT id, fullname, username, bio, interests, profilephoto, dateregistered, friends_add_request_from, friends_with_array, profession, companyname, university, platformstatus, relationship_status\
                    FROM members WHERE accountstatus = 'active' && hide_profile='off' && \
                    gender!=? && university=? && country_name=? && profile_type=? && interests LIKE ? && session!=? ORDER BY visits DESC";
                    console.log('CASE A-1');

                }
                else if (
                    (_school == '' || _school == 'University / School') &&
                    (_country != '' && _country != 'Country') &&
                    (_profiletype != '' && _profiletype != 'Profile Type') &&
                    (_interests != '' && _interests != 'Interest')
                ) 
                {
                    // CASE 2 EVERYBODY HAS VALUE S:0 C:1 P:1 I:1
                    // when condition has !=, 1 then sql is = OR (LIKE for interest)
                    // when condition has ==, 0 then sql is != OR (= for interest)
                    sql_interests = "SELECT id, fullname, username, bio, interests, profilephoto, dateregistered, friends_add_request_from, friends_with_array, profession, companyname, university, platformstatus, relationship_status\
                    FROM members WHERE accountstatus = 'active' && hide_profile='off' && \
                    gender!=? && university!=? && country_name=? && profile_type=? && interests LIKE ? && session!=? ORDER BY visits DESC";
                    console.log('CASE A-2');

                }
                else if (
                    (_school == '' || _school == 'University / School') &&
                    (_country == '' || _country == 'Country') &&
                    (_profiletype != '' && _profiletype != 'Profile Type') &&
                    (_interests != '' && _interests != 'Interest')
                ) 
                {
                    // CASE 3 EVERYBODY HAS VALUE S:0 C:0 P:1 I:1
                    // when condition has !=, 1 then sql is = OR (LIKE for interest)
                    // when condition has ==, 0 then sql is != OR (= for interest)
                    sql_interests = "SELECT id, fullname, username, bio, interests, profilephoto, dateregistered, friends_add_request_from, friends_with_array, profession, companyname, university, platformstatus, relationship_status\
                    FROM members WHERE accountstatus = 'active' && hide_profile='off' && \
                    gender!=? && university!=? && country_name!=? && profile_type=? && interests LIKE ? && session!=? ORDER BY visits DESC";
                    console.log('CASE A-3');

                }
                else if (
                    (_school == '' || _school == 'University / School') &&
                    (_country == '' || _country == 'Country') &&
                    (_profiletype == '' || _profiletype == 'Profile Type') &&
                    (_interests != '' && _interests != 'Interest')
                ) 
                {
                    // CASE 4 EVERYBODY HAS VALUE S:0 C:0 P:0 I:1
                    // when condition has !=, 1 then sql is = OR (LIKE for interest)
                    // when condition has ==, 0 then sql is != OR (= for interest)
                    sql_interests = "SELECT id, fullname, username, bio, interests, profilephoto, dateregistered, friends_add_request_from, friends_with_array, profession, companyname, university, platformstatus, relationship_status\
                    FROM members WHERE accountstatus = 'active' && hide_profile='off' && \
                    gender!=? && university!=? && country_name!=? && profile_type!=? && interests LIKE ? && session!=? ORDER BY visits DESC";
                    console.log('CASE A-4');

                }
                else if (
                    (_school == '' || _school == 'University / School') &&
                    (_country == '' || _country == 'Country') &&
                    (_profiletype == '' || _profiletype == 'Profile Type') &&
                    (_interests == '' || _interests == 'Interest')
                ) 
                {
                    // CASE 5 EVERYBODY HAS VALUE S:0 C:0 P:0 I:0
                    // when condition has !=, 1 then sql is = OR (LIKE for interest)
                    // when condition has ==, 0 then sql is != OR (= for interest)
                    sql_interests = "SELECT id, fullname, username, bio, interests, profilephoto, dateregistered, friends_add_request_from, friends_with_array, profession, companyname, university, platformstatus, relationship_status\
                    FROM members WHERE accountstatus = 'active' && hide_profile='off' && \
                    gender!=? && university!=? && country_name!=? && profile_type!=? && interests != ? && session!=? ORDER BY visits DESC";
                    console.log('CASE A-5');

                }
                else if (
                    (_school == '' || _school == 'University / School') &&
                    (_country != '' && _country != 'Country') &&
                    (_profiletype == '' || _profiletype == 'Profile Type') &&
                    (_interests != '' && _interests != 'Interest')
                ) 
                {
                    // CASE 6 EVERYBODY HAS VALUE S:0 C:1 P:0 I:1
                    // when condition has !=, 1 then sql is = OR (LIKE for interest)
                    // when condition has ==, 0 then sql is != OR (= for interest)
                    sql_interests = "SELECT id, fullname, username, bio, interests, profilephoto, dateregistered, friends_add_request_from, friends_with_array, profession, companyname, university, platformstatus, relationship_status\
                    FROM members WHERE accountstatus = 'active' && hide_profile='off' && \
                    gender!=? && university!=? && country_name=? && profile_type!=? && interests LIKE ? && session!=? ORDER BY visits DESC";
                    console.log('CASE A-6');

                }
                else if (
                    (_school == '' || _school == 'University / School') &&
                    (_country != '' && _country != 'Country') &&
                    (_profiletype != '' && _profiletype != 'Profile Type') &&
                    (_interests == '' || _interests == 'Interest')
                ) 
                {
                    // CASE 7 EVERYBODY HAS VALUE S:0 C:1 P:1 I:0
                    // when condition has !=, 1 then sql is = OR (LIKE for interest)
                    // when condition has ==, 0 then sql is != OR (= for interest)
                    sql_interests = "SELECT id, fullname, username, bio, interests, profilephoto, dateregistered, friends_add_request_from, friends_with_array, profession, companyname, university, platformstatus, relationship_status\
                    FROM members WHERE accountstatus = 'active' && hide_profile='off' && \
                    gender!=? && university!=? && country_name=? && profile_type=? && interests != ? && session!=? ORDER BY visits DESC";
                    console.log('CASE A-7');

                }
                else if (
                    (_school == '' || _school == 'University / School') &&
                    (_country != '' && _country != 'Country') &&
                    (_profiletype == '' || _profiletype == 'Profile Type') &&
                    (_interests == '' || _interests == 'Interest')
                ) 
                {
                    // CASE 8 EVERYBODY HAS VALUE S:0 C:1 P:0 I:0
                    // when condition has !=, 1 then sql is = OR (LIKE for interest)
                    // when condition has ==, 0 then sql is != OR (= for interest)
                    sql_interests = "SELECT id, fullname, username, bio, interests, profilephoto, dateregistered, friends_add_request_from, friends_with_array, profession, companyname, university, platformstatus, relationship_status\
                    FROM members WHERE accountstatus = 'active' && hide_profile='off' && \
                    gender!=? && university!=? && country_name=? && profile_type!=? && interests != ? && session!=? ORDER BY visits DESC";
                    console.log('CASE A-8');

                }
                else if (
                    (_school != '' && _school != 'University / School') &&
                    (_country == '' || _country == 'Country') &&
                    (_profiletype != '' && _profiletype != 'Profile Type') &&
                    (_interests != '' && _interests != 'Interest')
                ) 
                {
                    // CASE 9 EVERYBODY HAS VALUE S:1 C:0 P:1 I:1
                    // when condition has !=, 1 then sql is = OR (LIKE for interest)
                    // when condition has ==, 0 then sql is != OR (= for interest)
                    sql_interests = "SELECT id, fullname, username, bio, interests, profilephoto, dateregistered, friends_add_request_from, friends_with_array, profession, companyname, university, platformstatus, relationship_status\
                    FROM members WHERE accountstatus = 'active' && hide_profile='off' && \
                    gender!=? && university=? && country_name!=? && profile_type=? && interests LIKE ? && session!=? ORDER BY visits DESC";
                    console.log('CASE A-9');

                }
                else if (
                    (_school != '' && _school != 'University / School') &&
                    (_country == '' || _country == 'Country') &&
                    (_profiletype == '' || _profiletype == 'Profile Type') &&
                    (_interests != '' && _interests != 'Interest')
                ) 
                {
                    // CASE 10 EVERYBODY HAS VALUE S:1 C:0 P:0 I:1
                    // when condition has !=, 1 then sql is = OR (LIKE for interest)
                    // when condition has ==, 0 then sql is != OR (= for interest)
                    sql_interests = "SELECT id, fullname, username, bio, interests, profilephoto, dateregistered, friends_add_request_from, friends_with_array, profession, companyname, university, platformstatus, relationship_status\
                    FROM members WHERE accountstatus = 'active' && hide_profile='off' && \
                    gender!=? && university=? && country_name!=? && profile_type!=? && interests LIKE ? && session!=? ORDER BY visits DESC";
                    console.log('CASE A-10');

                }
                else if (
                    (_school != '' && _school != 'University / School') &&
                    (_country == '' || _country == 'Country') &&
                    (_profiletype == '' || _profiletype == 'Profile Type') &&
                    (_interests == '' || _interests == 'Interest')
                ) 
                {
                    // CASE 11 EVERYBODY HAS VALUE S:1 C:0 P:0 I:0
                    // when condition has !=, 1 then sql is = OR (LIKE for interest)
                    // when condition has ==, 0 then sql is != OR (= for interest)
                    sql_interests = "SELECT id, fullname, username, bio, interests, profilephoto, dateregistered, friends_add_request_from, friends_with_array, profession, companyname, university, platformstatus, relationship_status\
                    FROM members WHERE accountstatus = 'active' && hide_profile='off' && \
                    gender!=? && university=? && country_name!=? && profile_type!=? && interests != ? && session!=? ORDER BY visits DESC";
                    console.log('CASE A-11');

                }
                else if (
                    (_school != '' && _school != 'University / School') &&
                    (_country != '' && _country != 'Country') &&
                    (_profiletype == '' || _profiletype == 'Profile Type') &&
                    (_interests != '' && _interests != 'Interest')
                ) 
                {
                    // CASE 12 EVERYBODY HAS VALUE S:1 C:1 P:0 I:1
                    // when condition has !=, 1 then sql is = OR (LIKE for interest)
                    // when condition has ==, 0 then sql is != OR (= for interest)
                    sql_interests = "SELECT id, fullname, username, bio, interests, profilephoto, dateregistered, friends_add_request_from, friends_with_array, profession, companyname, university, platformstatus, relationship_status\
                    FROM members WHERE accountstatus = 'active' && hide_profile='off' && \
                    gender!=? && university=? && country_name=? && profile_type!=? && interests LIKE ? && session!=? ORDER BY visits DESC";
                    console.log('CASE A-12');

                }
                else if (
                    (_school != '' && _school != 'University / School') &&
                    (_country != '' && _country != 'Country') &&
                    (_profiletype != '' && _profiletype != 'Profile Type') &&
                    (_interests == '' || _interests == 'Interest')
                ) 
                {
                    // CASE 13 EVERYBODY HAS VALUE S:1 C:1 P:1 I:0
                    // when condition has !=, 1 then sql is = OR (LIKE for interest)
                    // when condition has ==, 0 then sql is != OR (= for interest)
                    sql_interests = "SELECT id, fullname, username, bio, interests, profilephoto, dateregistered, friends_add_request_from, friends_with_array, profession, companyname, university, platformstatus, relationship_status\
                    FROM members WHERE accountstatus = 'active' && hide_profile='off' && \
                    gender!=? && university=? && country_name=? && profile_type=? && interests != ? && session!=? ORDER BY visits DESC";
                    console.log('CASE A-13');

                }
                else if (
                    (_school != '' && _school != 'University / School') &&
                    (_country != '' && _country != 'Country') &&
                    (_profiletype == '' || _profiletype == 'Profile Type') &&
                    (_interests == '' || _interests == 'Interest')
                ) 
                {
                    // CASE 14 EVERYBODY HAS VALUE S:1 C:1 P:0 I:0
                    // when condition has !=, 1 then sql is = OR (LIKE for interest)
                    // when condition has ==, 0 then sql is != OR (= for interest)
                    sql_interests = "SELECT id, fullname, username, bio, interests, profilephoto, dateregistered, friends_add_request_from, friends_with_array, profession, companyname, university, platformstatus, relationship_status\
                    FROM members WHERE accountstatus = 'active' && hide_profile='off' && \
                    gender!=? && university=? && country_name=? && profile_type!=? && interests != ? && session!=? ORDER BY visits DESC";
                    console.log('CASE A-14');

                }
                else if (
                    (_school != '' && _school != 'University / School') &&
                    (_country == '' || _country == 'Country') &&
                    (_profiletype != '' && _profiletype != 'Profile Type') &&
                    (_interests == '' || _interests == 'Interest')
                ) 
                {
                    // CASE 15 EVERYBODY HAS VALUE S:1 C:0 P:1 I:0
                    // when condition has !=, 1 then sql is = OR (LIKE for interest)
                    // when condition has ==, 0 then sql is != OR (= for interest)
                    sql_interests = "SELECT id, fullname, username, bio, interests, profilephoto, dateregistered, friends_add_request_from, friends_with_array, profession, companyname, university, platformstatus, relationship_status\
                    FROM members WHERE accountstatus = 'active' && hide_profile='off' && \
                    gender!=? && university=? && country_name!=? && profile_type=? && interests != ? && session!=? ORDER BY visits DESC";
                    console.log('CASE A-15');

                }
                else if (
                    (_school == '' || _school == 'University / School') &&
                    (_country == '' || _country == 'Country') &&
                    (_profiletype != '' && _profiletype != 'Profile Type') &&
                    (_interests == '' || _interests == 'Interest')
                ) 
                {
                    // CASE 16 EVERYBODY HAS VALUE S:0 C:0 P:1 I:0
                    // when condition has !=, 1 then sql is = OR (LIKE for interest)
                    // when condition has ==, 0 then sql is != OR (= for interest)
                    sql_interests = "SELECT id, fullname, username, bio, interests, profilephoto, dateregistered, friends_add_request_from, friends_with_array, profession, companyname, university, platformstatus, relationship_status\
                    FROM members WHERE accountstatus = 'active' && hide_profile='off' && \
                    gender!=? && university!=? && country_name!=? && profile_type=? && interests != ? && session!=? ORDER BY visits DESC";
                    console.log('CASE A-16');

                }



            }else{

            // WHEN GENDER IS SPECIFIC
            // WHEN GENDER IS SPECIFIC
            // WHEN GENDER IS SPECIFIC
            // WHEN GENDER IS SPECIFIC
            // WHEN GENDER IS SPECIFIC
            // WHEN GENDER IS SPECIFIC
            // WHEN GENDER IS SPECIFIC
            // WHEN GENDER IS SPECIFIC
            // WHEN GENDER IS SPECIFIC
            // WHEN GENDER IS SPECIFIC
            // WHEN GENDER IS SPECIFIC
            // WHEN GENDER IS SPECIFIC
            // WHEN GENDER IS SPECIFIC
            // WHEN GENDER IS SPECIFIC
            // WHEN GENDER IS SPECIFIC
            // WHEN GENDER IS SPECIFIC
            // WHEN GENDER IS SPECIFIC

                // UNDERSTANDING == MEANS 0
                // UNDERSTANDING != MEANS 1
                if (
                    (_school != '' && _school != 'University / School') &&
                    (_country != '' && _country != 'Country') &&
                    (_profiletype != '' && _profiletype != 'Profile Type') &&
                    (_interests != '' && _interests != 'Interest')
                    )
                {
                    // CASE 1 EVERYBODY HAS VALUE S:1 C:1 P:1 I:1
                    // when condition has !=, 1 then sql is = OR (LIKE for interest)
                    // when condition has ==, 0 then sql is != OR (= for interest)
                    sql_interests = "SELECT id, fullname, username, bio, interests, profilephoto, dateregistered, friends_add_request_from, friends_with_array, profession, companyname, university, platformstatus, relationship_status\
                    FROM members WHERE accountstatus = 'active' && hide_profile='off' && \
                    gender=? && university=? && country_name=? && profile_type=? && interests LIKE ? && session!=? ORDER BY visits DESC";
                    console.log('CASE B1');
                }
                else if (
                    (_school == '' || _school == 'University / School') &&
                    (_country != '' && _country != 'Country') &&
                    (_profiletype != '' && _profiletype != 'Profile Type') &&
                    (_interests != '' && _interests != 'Interest')
                ) 
                {
                    // CASE 2 EVERYBODY HAS VALUE S:0 C:1 P:1 I:1
                    // when condition has !=, 1 then sql is = OR (LIKE for interest)
                    // when condition has ==, 0 then sql is != OR (= for interest)
                    sql_interests = "SELECT id, fullname, username, bio, interests, profilephoto, dateregistered, friends_add_request_from, friends_with_array, profession, companyname, university, platformstatus, relationship_status\
                    FROM members WHERE accountstatus = 'active' && hide_profile='off' && \
                    gender=? && university!=? && country_name=? && profile_type=? && interests LIKE ? && session!=? ORDER BY visits DESC";
                    console.log('CASE B2');

                }
                else if (
                    (_school == '' || _school == 'University / School') &&
                    (_country == '' || _country == 'Country') &&
                    (_profiletype != '' && _profiletype != 'Profile Type') &&
                    (_interests != '' && _interests != 'Interest')
                ) 
                {
                    // CASE 3 EVERYBODY HAS VALUE S:0 C:0 P:1 I:1
                    // when condition has !=, 1 then sql is = OR (LIKE for interest)
                    // when condition has ==, 0 then sql is != OR (= for interest)
                    sql_interests = "SELECT id, fullname, username, bio, interests, profilephoto, dateregistered, friends_add_request_from, friends_with_array, profession, companyname, university, platformstatus, relationship_status\
                    FROM members WHERE accountstatus = 'active' && hide_profile='off' && \
                    gender=? && university!=? && country_name!=? && profile_type=? && interests LIKE ? && session!=? ORDER BY visits DESC";
                    console.log('CASE B3');

                }
                else if (
                    (_school == '' || _school == 'University / School') &&
                    (_country == '' || _country == 'Country') &&
                    (_profiletype == '' || _profiletype == 'Profile Type') &&
                    (_interests != '' && _interests != 'Interest')
                ) 
                {
                    // CASE 4 EVERYBODY HAS VALUE S:0 C:0 P:0 I:1
                    // when condition has !=, 1 then sql is = OR (LIKE for interest)
                    // when condition has ==, 0 then sql is != OR (= for interest)
                    sql_interests = "SELECT id, fullname, username, bio, interests, profilephoto, dateregistered, friends_add_request_from, friends_with_array, profession, companyname, university, platformstatus, relationship_status\
                    FROM members WHERE accountstatus = 'active' && hide_profile='off' && \
                    gender=? && university!=? && country_name!=? && profile_type!=? && interests LIKE ? && session!=? ORDER BY visits DESC";
                    console.log('CASE B4');

                }
                else if (
                    (_school == '' || _school == 'University / School') &&
                    (_country == '' || _country == 'Country') &&
                    (_profiletype == '' || _profiletype == 'Profile Type') &&
                    (_interests == '' || _interests == 'Interest')
                ) 
                {
                    // CASE 5 EVERYBODY HAS VALUE S:0 C:0 P:0 I:0
                    // when condition has !=, 1 then sql is = OR (LIKE for interest)
                    // when condition has ==, 0 then sql is != OR (= for interest)
                    sql_interests = "SELECT id, fullname, username, bio, interests, profilephoto, dateregistered, friends_add_request_from, friends_with_array, profession, companyname, university, platformstatus, relationship_status\
                    FROM members WHERE accountstatus = 'active' && hide_profile='off' && \
                    gender=? && university!=? && country_name!=? && profile_type!=? && interests != ? && session!=? ORDER BY visits DESC";
                    console.log('CASE B5');

                }
                else if (
                    (_school == '' || _school == 'University / School') &&
                    (_country != '' && _country != 'Country') &&
                    (_profiletype == '' || _profiletype == 'Profile Type') &&
                    (_interests != '' && _interests != 'Interest')
                ) 
                {
                    // CASE 6 EVERYBODY HAS VALUE S:0 C:1 P:0 I:1
                    // when condition has !=, 1 then sql is = OR (LIKE for interest)
                    // when condition has ==, 0 then sql is != OR (= for interest)
                    sql_interests = "SELECT id, fullname, username, bio, interests, profilephoto, dateregistered, friends_add_request_from, friends_with_array, profession, companyname, university, platformstatus, relationship_status\
                    FROM members WHERE accountstatus = 'active' && hide_profile='off' && \
                    gender=? && university!=? && country_name=? && profile_type!=? && interests LIKE ? && session!=? ORDER BY visits DESC";
                    console.log('CASE B6');

                }
                else if (
                    (_school == '' || _school == 'University / School') &&
                    (_country != '' && _country != 'Country') &&
                    (_profiletype != '' && _profiletype != 'Profile Type') &&
                    (_interests == '' || _interests == 'Interest')
                ) 
                {
                    // CASE 7 EVERYBODY HAS VALUE S:0 C:1 P:1 I:0
                    // when condition has !=, 1 then sql is = OR (LIKE for interest)
                    // when condition has ==, 0 then sql is != OR (= for interest)
                    sql_interests = "SELECT id, fullname, username, bio, interests, profilephoto, dateregistered, friends_add_request_from, friends_with_array, profession, companyname, university, platformstatus, relationship_status\
                    FROM members WHERE accountstatus = 'active' && hide_profile='off' && \
                    gender=? && university!=? && country_name=? && profile_type=? && interests != ? && session!=? ORDER BY visits DESC";
                    console.log('CASE B7');

                }
                else if (
                    (_school == '' || _school == 'University / School') &&
                    (_country != '' && _country != 'Country') &&
                    (_profiletype == '' || _profiletype == 'Profile Type') &&
                    (_interests == '' || _interests == 'Interest')
                ) 
                {
                    // CASE 8 EVERYBODY HAS VALUE S:0 C:1 P:0 I:0
                    // when condition has !=, 1 then sql is = OR (LIKE for interest)
                    // when condition has ==, 0 then sql is != OR (= for interest)
                    sql_interests = "SELECT id, fullname, username, bio, interests, profilephoto, dateregistered, friends_add_request_from, friends_with_array, profession, companyname, university, platformstatus, relationship_status\
                    FROM members WHERE accountstatus = 'active' && hide_profile='off' && \
                    gender=? && university!=? && country_name=? && profile_type!=? && interests != ? && session!=? ORDER BY visits DESC";
                    console.log('CASE B8');

                }
                else if (
                    (_school != '' && _school != 'University / School') &&
                    (_country == '' || _country == 'Country') &&
                    (_profiletype != '' && _profiletype != 'Profile Type') &&
                    (_interests != '' && _interests != 'Interest')
                ) 
                {
                    // CASE 9 EVERYBODY HAS VALUE S:1 C:0 P:1 I:1
                    // when condition has !=, 1 then sql is = OR (LIKE for interest)
                    // when condition has ==, 0 then sql is != OR (= for interest)
                    sql_interests = "SELECT id, fullname, username, bio, interests, profilephoto, dateregistered, friends_add_request_from, friends_with_array, profession, companyname, university, platformstatus, relationship_status\
                    FROM members WHERE accountstatus = 'active' && hide_profile='off' && \
                    gender=? && university=? && country_name!=? && profile_type=? && interests LIKE ? && session!=? ORDER BY visits DESC";
                    console.log('CASE B9');

                }
                else if (
                    (_school != '' && _school != 'University / School') &&
                    (_country == '' || _country == 'Country') &&
                    (_profiletype == '' || _profiletype == 'Profile Type') &&
                    (_interests != '' && _interests != 'Interest')
                ) 
                {
                    // CASE 10 EVERYBODY HAS VALUE S:1 C:0 P:0 I:1
                    // when condition has !=, 1 then sql is = OR (LIKE for interest)
                    // when condition has ==, 0 then sql is !=
                    sql_interests = "SELECT id, fullname, username, bio, interests, profilephoto, dateregistered, friends_add_request_from, friends_with_array, profession, companyname, university, platformstatus, relationship_status\
                    FROM members WHERE accountstatus = 'active' && hide_profile='off' && \
                    gender=? && university=? && country_name!=? && profile_type!=? && interests LIKE ? && session!=? ORDER BY visits DESC";
                    console.log('CASE B-10');

                }
                else if (
                    (_school != '' && _school != 'University / School') &&
                    (_country == '' || _country == 'Country') &&
                    (_profiletype == '' || _profiletype == 'Profile Type') &&
                    (_interests == '' || _interests == 'Interest')
                ) 
                {
                    // CASE 11 EVERYBODY HAS VALUE S:1 C:0 P:0 I:0
                    // when condition has !=, 1 then sql is = OR (LIKE for interest)
                    // when condition has ==, 0 then sql is != OR (= for interest)
                    sql_interests = "SELECT id, fullname, username, bio, interests, profilephoto, dateregistered, friends_add_request_from, friends_with_array, profession, companyname, university, platformstatus, relationship_status\
                    FROM members WHERE accountstatus = 'active' && hide_profile='off' && \
                    gender=? && university=? && country_name!=? && profile_type!=? && interests != ? && session!=? ORDER BY visits DESC";
                    console.log('CASE B-11');

                }
                else if (
                    (_school != '' && _school != 'University / School') &&
                    (_country != '' && _country != 'Country') &&
                    (_profiletype == '' || _profiletype == 'Profile Type') &&
                    (_interests != '' && _interests != 'Interest')
                ) 
                {
                    // CASE 12 EVERYBODY HAS VALUE S:1 C:1 P:0 I:1
                    // when condition has !=, 1 then sql is = OR (LIKE for interest)
                    // when condition has ==, 0 then sql is != OR (= for interest)
                    sql_interests = "SELECT id, fullname, username, bio, interests, profilephoto, dateregistered, friends_add_request_from, friends_with_array, profession, companyname, university, platformstatus, relationship_status\
                    FROM members WHERE accountstatus = 'active' && hide_profile='off' && \
                    gender=? && university=? && country_name=? && profile_type!=? && interests LIKE ? && session!=? ORDER BY visits DESC";
                    console.log('CASE B-12');

                }
                else if (
                    (_school != '' && _school != 'University / School') &&
                    (_country != '' && _country != 'Country') &&
                    (_profiletype != '' && _profiletype != 'Profile Type') &&
                    (_interests == '' || _interests == 'Interest')
                ) 
                {
                    // CASE 13 EVERYBODY HAS VALUE S:1 C:1 P:1 I:0
                    // when condition has !=, 1 then sql is = OR (LIKE for interest)
                    // when condition has ==, 0 then sql is != OR (= for interest)
                    sql_interests = "SELECT id, fullname, username, bio, interests, profilephoto, dateregistered, friends_add_request_from, friends_with_array, profession, companyname, university, platformstatus, relationship_status\
                    FROM members WHERE accountstatus = 'active' && hide_profile='off' && \
                    gender=? && university=? && country_name=? && profile_type=? && interests != ? && session!=? ORDER BY visits DESC";
                    console.log('CASE B-13');

                }
                else if (
                    (_school != '' && _school != 'University / School') &&
                    (_country != '' && _country != 'Country') &&
                    (_profiletype == '' || _profiletype == 'Profile Type') &&
                    (_interests == '' || _interests == 'Interest')
                ) 
                {
                    // CASE 14 EVERYBODY HAS VALUE S:1 C:1 P:0 I:0
                    // when condition has !=, 1 then sql is = OR (LIKE for interest)
                    // when condition has ==, 0 then sql is != OR (= for interest)
                    sql_interests = "SELECT id, fullname, username, bio, interests, profilephoto, dateregistered, friends_add_request_from, friends_with_array, profession, companyname, university, platformstatus, relationship_status\
                    FROM members WHERE accountstatus = 'active' && hide_profile='off' && \
                    gender=? && university=? && country_name=? && profile_type!=? && interests != ? && session!=? ORDER BY visits DESC";
                    console.log('CASE B-14');

                }
                else if (
                    (_school != '' && _school != 'University / School') &&
                    (_country == '' || _country == 'Country') &&
                    (_profiletype != '' && _profiletype != 'Profile Type') &&
                    (_interests == '' || _interests == 'Interest')
                ) 
                {
                    // CASE 15 EVERYBODY HAS VALUE S:1 C:0 P:1 I:0
                    // when condition has !=, 1 then sql is = OR (LIKE for interest)
                    // when condition has ==, 0 then sql is != OR (= for interest)
                    sql_interests = "SELECT id, fullname, username, bio, interests, profilephoto, dateregistered, friends_add_request_from, friends_with_array, profession, companyname, university, platformstatus, relationship_status\
                    FROM members WHERE accountstatus = 'active' && hide_profile='off' && \
                    gender=? && university=? && country_name!=? && profile_type=? && interests != ? && session!=? ORDER BY visits DESC";
                    console.log('CASE B-15');

                }
                else if (
                    (_school == '' || _school == 'University / School') &&
                    (_country == '' || _country == 'Country') &&
                    (_profiletype != '' && _profiletype != 'Profile Type') &&
                    (_interests == '' || _interests == 'Interest')
                ) 
                {
                    // CASE 16 EVERYBODY HAS VALUE S:0 C:0 P:1 I:0
                    // when condition has !=, 1 then sql is = OR (LIKE for interest)
                    // when condition has ==, 0 then sql is != OR (= for interest)
                    sql_interests = "SELECT id, fullname, username, bio, interests, profilephoto, dateregistered, friends_add_request_from, friends_with_array, profession, companyname, university, platformstatus, relationship_status\
                    FROM members WHERE accountstatus = 'active' && hide_profile='off' && \
                    gender=? && university!=? && country_name!=? && profile_type=? && interests != ? && session!=? ORDER BY visits DESC";
                    console.log('CASE B-16');

                }


            }








            // myinterest = JSON.stringify(myinterest);

            var escape_filter_array = [
                _gender,
                _school,
                _country,
                _profiletype,
                '%'+_interests+'%',
                _session
            ]

            try {
                mysqlConnectionfidsbay.query(sql_interests,escape_filter_array,function (err,result1,fields) {

                    if (!err) {
                        // console.log(result1);
                        res.send({status: 'ok', message: 'success', body: result1});
                    }else{
                        console.log(err);
                        res.send({status: 'error', message: 'database error'});

                    }

                });

            } catch (error) {
                console.log(error);
                res.send({status: 'error', message: 'server error'});

            }
  
        
        
        });  




        


        
        




















module.exports = router;