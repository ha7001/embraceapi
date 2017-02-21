var express = require('express');
var router = express.Router();
var path = require('path');
// var stormpath = require('express-stormpath');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var fs = require('fs');
var multer = require('multer');
var dataUriToBuffer = require('data-uri-to-buffer');
var async = require('async');
var json2csv = require('json2csv');
var converter = require('json-2-csv');
var csv = require('express-csv');


var uploadPath = '/usr/share/nginx/sites/api.girlscouts/public/uploads/real/';
var csvPath = '/usr/share/nginx/sites/api.girlscouts/public/';
var url = "http://api.girlscouts.harryatwal.com";

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/usr/share/nginx/sites/api.girlscouts/public/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.png');
    }
});

var upload = multer({ storage: storage }).single('myImage');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'embraced',
    password: 'em@g!c7',
    database: 'EmbracedPilot'
});

connection.connect(function(err) {
    if (err) {
        console.log('Error connecting to Db');
        return;
    }
    console.log('Connection established');
});

router.use('/static', express.static(__dirname + '/../public'));
router.use('/static_images', express.static(__dirname + '/../public/images'));
router.use('/static_videos', express.static(__dirname + '/../public/videos'));
router.use('/static_audios', express.static(__dirname + '/../public/audios'));
router.use('/static_data', express.static(__dirname + '/../public/uploads'));


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// var misques = 0;
// var variables = [];
//
// router.get('/questionnaire', function(req, res, next) {
//
//
//     addToArray("writinghand");
//     addToArray("drawinghand");
//     addToArray("throwinghand");
//     addToArray("scissorshand");
//     addToArray("toothbrushhand");
//     addToArray("knifehand");
//     addToArray("spoonhand");
//     addToArray("broomhand");
//     addToArray("matchhand");
//     addToArray("openinghand");
//     addToArray("race");
//     addToArray("ethnicity");
//     addToArray("mstatus");
//     addToArray("married_years");
//     addToArray("married_months");
//     addToArray("partner_years");
//     addToArray("partner_months");
//     addToArray("widow_years");
//     addToArray("widow_months");
//     addToArray("separated_years");
//     addToArray("separated_months");
//     addToArray("kids");
//     addToArray("quantity");
//     addToArray("cage1");
//     addToArray("cgender1");
//     addToArray("cage2");
//     addToArray("cgender2");
//     addToArray("cage3");
//     addToArray("cgender3");
//     addToArray("cage4");
//     addToArray("cgender4");
//     addToArray("cage5");
//     addToArray("cgender5");
//     addToArray("cage6");
//     addToArray("cgender6");
//     addToArray("cage7");
//     addToArray("cgender7");
//     addToArray("cage8");
//     addToArray("cgender8");
//     addToArray("residencecity");
//     addToArray("residencestate");
//     addToArray("residencecountry");
//     addToArray("residenceinhabitants");
//     addToArray("residencegeography");
//     addToArray("daily_activities");
//     addToArray("unemployed_years");
//     addToArray("unemployed_months");
//     addToArray("job_type");
//     addToArray("current_position");
//     addToArray("current_position_desc");
//     addToArray("other_current_position_desc");
//     addToArray("condition_desc");
//     addToArray("participate_descisions");
//     addToArray("supervise_others");
//     addToArray("financially_dependent");
//     addToArray("earnings");
//     addToArray("people_in_household");
//     addToArray("children_in_household");
//     addToArray("adults_in_household");
//     addToArray("adults_income_in_household");
//     addToArray("home_status");
//     addToArray("other_home_status");
//     addToArray("total_income");
//     addToArray("communityLadder");
//     addToArray("countryLadder");
//     addToArray("years_study");
//     addToArray("age_study");
//     addToArray("not_finished_school");
//     addToArray("highest_grade");
//     addToArray("highest_degree");
//     addToArray("other_highest_degree");
//     addToArray("computer_usage");
//     addToArray("internet_usage");
//     addToArray("beliefs");
//     addToArray("religion");
//     addToArray("other_religion");
//     addToArray("practice_month");
//     addToArray("housekeeping_as_child_mother");
//     addToArray("housekeeping_as_child_father");
//     addToArray("housekeeping_as_child_partner");
//     addToArray("housekeeping_as_child_grandmother");
//     addToArray("housekeeping_as_child_grandfather");
//     addToArray("housekeeping_as_child_aunt");
//     addToArray("housekeeping_as_child_uncle");
//     addToArray("housekeeping_as_child_sister");
//     addToArray("housekeeping_as_child_brother");
//     addToArray("housekeeping_as_child_male_cousin");
//     addToArray("housekeeping_as_child_female_cousin");
//     addToArray("housekeep_as_current_mother");
//     addToArray("housekeep_as_current_father");
//     addToArray("housekeep_as_current_partner");
//     addToArray("housekeep_as_current_grandmother");
//     addToArray("housekeep_as_current_grandfather");
//     addToArray("housekeep_as_current_aunt");
//     addToArray("housekeep_as_current_uncle");
//     addToArray("housekeep_as_current_sister");
//     addToArray("housekeep_as_current_brother");
//     addToArray("housekeep_as_current_male_cousin");
//     addToArray("housekeep_as_current_female_cousin");
//     addToArray("caretaker_as_child_mother");
//     addToArray("caretaker_as_child_father");
//     addToArray("caretaker_as_child_partner");
//     addToArray("caretaker_as_child_grandmother");
//     addToArray("caretaker_as_child_grandfather");
//     addToArray("caretaker_as_child_aunt");
//     addToArray("caretaker_as_child_uncle");
//     addToArray("caretaker_as_child_sister");
//     addToArray("caretaker_as_child_brother");
//     addToArray("caretaker_as_child_male_cousin");
//     addToArray("caretaker_as_child_female_cousin");
//     addToArray("caretaker_mother");
//     addToArray("caretaker_father");
//     addToArray("caretaker_partner");
//     addToArray("caretaker_grandmother");
//     addToArray("caretaker_grandfather");
//     addToArray("caretaker_aunt");
//     addToArray("caretaker_uncle");
//     addToArray("caretaker_sister");
//     addToArray("caretaker_brother");
//     addToArray("caretaker_male_cousin");
//     addToArray("caretaker_female_cousin");
//     addToArray("child_upbringing_mother");
//     addToArray("child_upbringing_father");
//     addToArray("child_upbringing_partner");
//     addToArray("child_upbringing_grandmother");
//     addToArray("child_upbringing_grandfather");
//     addToArray("child_upbringing_aunt");
//     addToArray("child_upbringing_uncle");
//     addToArray("child_upbringing_sister");
//     addToArray("child_upbringing_brother");
//     addToArray("child_upbringing_male_cousin");
//     addToArray("child_upbringing_female_cousin");
//     addToArray("important_decisions_current_mother");
//     addToArray("important_decisions_current_father");
//     addToArray("important_decisions_current_partner");
//     addToArray("important_decisions_current_grandmother");
//     addToArray("important_decisions_current_grandfather");
//     addToArray("important_decisions_current_aunt");
//     addToArray("important_decisions_current_uncle");
//     addToArray("important_decisions_current_sister");
//     addToArray("important_decisions_current_brother");
//     addToArray("important_decisions_current_male_cousin");
//     addToArray("important_decisions_current_female_cousin");
//     addToArray("personal_space");
//     addToArray("capabilities");
//     addToArray("unique");
//     addToArray("law_of_nature");
//     addToArray("competition");
//     addToArray("sacrifice_activity");
//     addToArray("detest");
//     addToArray("sacrifice_interest");
//     addToArray("fast_task");
//     addToArray("slow_task");
//     addToArray("count_on");
//     addToArray("count_on_friend");
//     addToArray("count_on_partner");
//     addToArray("count_on_relative");
//     addToArray("rely_on");
//     addToArray("relies_on_friend");
//     addToArray("relies_on_partner");
//     addToArray("relies_on_relative");
//     addToArray("enjoy_on");
//     addToArray("enjoy_same_friend");
//     addToArray("enjoy_same_partner");
//     addToArray("enjoy_same_relative");
//     addToArray("no_help");
//     addToArray("emotional_on");
//     addToArray("emotional_link_friend");
//     addToArray("emotional_link_partner");
//     addToArray("emotional_link_relative");
//     addToArray("comfortable");
//     addToArray("administered_psychological_test");
//     addToArray("timed_psychological_test");
//     addToArray("comfortable_psychological_test");
//     addToArray("immigrant_born");
//     addToArray("immigrant_town_size");
//     addToArray("immigrant_live_place");
//     addToArray("immigrant_nationality");
//     addToArray("immigrants_move_years");
//     addToArray("immigrants_move_months");
//     addToArray("immigrant_daily_activities");
//     addToArray("immigrant_job_type");
//     addToArray("immigrant_current_position");
//     addToArray("immigrant_current_position_desc");
//     addToArray("immigrant_condition_desc");
//     addToArray("immigrant_participate_descisions");
//     addToArray("immigrant_supervise_others");
//     addToArray("myselfBeingAmerican");
//     addToArray("feelingGoodAmerican");
//     addToArray("americanImportant");
//     addToArray("feelAmericanCulture");
//     addToArray("strongBeingAmerican");
//     addToArray("proudAmerican");
//     addToArray("myCultureBeing");
//     addToArray("myCultureBeingGood");
//     addToArray("myCultureImportInLife");
//     addToArray("partOfCulture");
//     addToArray("beingOfCulture");
//     addToArray("beingOfCultureProud");
//     addToArray("englishschool");
//     addToArray("englishfriends");
//     addToArray("englishphone");
//     addToArray("englishstranger");
//     addToArray("englishgeneral");
//     addToArray("englishtv");
//     addToArray("englishnewspaper");
//     addToArray("englishsongs");
//     addToArray("englishugeneral");
//     addToArray("nativefamily");
//     addToArray("nativefriends");
//     addToArray("nativephone");
//     addToArray("nativestrangers");
//     addToArray("nativegeneral");
//     addToArray("nativetv");
//     addToArray("nativenewspaper");
//     addToArray("nativesongs");
//     addToArray("nativeugeneral");
//     addToArray("knowAmericanHeroes");
//     addToArray("knowAmericantv");
//     addToArray("knowAmericanNewspaper");
//     addToArray("knowAmericanActor");
//     addToArray("knowAmericanHistory");
//     addToArray("knowAmericanLeader");
//     addToArray("knowNativeHeroes");
//     addToArray("knowNativetv");
//     addToArray("knowNativeNewspaper");
//     addToArray("knowNativeActor");
//     addToArray("knowNativeHistory");
//     addToArray("knowNativeLeader");
//
//
//     console.log(variables);
//     console.log("Duplicates: " + misques);
//
//     res.json(variables);
//
// });

// function addToArray(item) {
//     if (variables.indexOf(item.toUpperCase()) == -1) {
//         variables.push(item.toUpperCase());
//     } else {
//         misques++;
//     }
// }

// Fetch all participants
router.get('/participants', function(req, res) {
    connection.query('CALL get_all_participants()', function(err, result) {
        if (err) res.statusCode(401);
        console.log(result[0]);
        res.json(result[0]);
    });
});

// Delete all participants
// router.delete('/participants', function(req, res) {
//     connection.query('CALL delete_all_participants()', function(err, result) {
//         if (err) res.statusCode(401);
//         res.send("All participants are deleted");
//     });
// });

// router.post('/testimage', function(req, res, next) {
//     upload(req, res, function(err) {
//         console.log(req.body);
//         if (err) {
//             res.end('Missing file');
//             return;
//         }
//         console.log(new Buffer(fs.readFileSync(req.file.path)).toString("base64"));
//
//         return res.end('FIRST TEST: ' + JSON.stringify(req.file));
//     });
// });
//
// router.post('/testimage/:id', function(req, res, next) {
//     var data = req.body;
//     var _id = req.params.id;
//     var image = data['imgBase64'];
//     var decoded = dataUriToBuffer(image);
//
//     fs.writeFileSync(uploadPath + _id + "/example.png", decoded);
//     // fs.writeFileSync(uploadPath + _id + "/example.jpg", bitmap);
//     // console.log(rv);
//     // res.json(rv);
//     res.send("Uploaded");
// });

router.post('/participant', function(req, res, next) {
    if(!req.body || typeof req.body.id != 'string') {
        res.status(400).send('400 Bad Request');
        return;
    }

    var data = req.body;
    var _id = data.id;
    var dayOfWeek = data.dayOfWeek;
    var country = data.country;
    var county = data.county;
    var city = data.city;
    var location = data.location;
    var floor = data.floor;
    var dir = uploadPath + _id;

    console.log("Going to create directory /tmp/test");
    fs.mkdir(dir, function(err){
        if (err) {
            return console.error(err);
        }
        console.log("Directory created successfully!");
    });

        console.log(data);
    connection.query('CALL insert_participant("' + _id + '", "' +
        dayOfWeek + '", "' +
        country + '", "' +
        county + '", "' +
        city + '", "' +
        location + '", "' +
        floor + '")', function(err, result) {
        console.log(result);
        if (err) throw err;
        res.send("http://api.girlscouts.harryatwal.com/participant/" + _id);
        res.status(200).end()
    });
});

router.get('/participant/:id', function(req, res, next) {
    var id = req.params.id;

    console.log(id);

    async.parallel({
        participant: function (callback) {
            connection.query('CALL get_participant("' + id + '")', function (err, result) {
                if (err) throw err;

                console.log(result[0][0]);

                if (result[0][0] != undefined) {
                    result[0][0].age = _calculateAge(result[0][0].dob);
                }

                callback(null, result[0][0]);
            });
        },
        acculturation: function (callback) {
            connection.query('CALL get_acculturation_by_id("' + id + '")', function (err, result) {
                if (err) throw err;

                callback(null, result[0][0]);
            });
        },
        cancellation: function (callback) {
            connection.query('CALL get_cancellation_by_id("' + id + '")', function (err, result) {
                if (err) throw err;

                callback(null, result[0][0]);
            });
        },
        children: function (callback) {
            connection.query('CALL get_children_by_id("' + id + '")', function (err, result) {
                if (err) throw err;

                callback(null, result[0]);
            });
        },
        clockDrawing: function (callback) {
            connection.query('CALL get_clock_drawing_by_id("' + id + '")', function (err, result) {
                if (err) throw err;

                callback(null, result[0][0]);
            });
        },
        comprehension: function (callback) {
            connection.query('CALL get_comprehension_by_id("' + id + '")', function (err, result) {
                if (err) throw err;

                callback(null, result[0][0]);
            });
        },
        cpt: function (callback) {
            connection.query('CALL get_cpt_by_id("' + id + '")', function (err, result) {
                if (err) throw err;

                callback(null, result[0][0]);
            });
        },
        cptHits: function (callback) {
            connection.query('CALL get_cpt_hits_by_id("' + id + '")', function (err, result) {
                if (err) throw err;

                callback(null, result[0]);
            });
        },
        culturalValues: function (callback) {
            connection.query('CALL get_cultural_values_by_id("' + id + '")', function (err, result) {
                if (err) throw err;

                callback(null, result[0][0]);
            });
        },
        digitalSpan: function (callback) {
            connection.query('CALL get_digital_span_by_id("' + id + '")', function (err, result) {
                if (err) throw err;

                callback(null, result[0][0]);
            });
        },
        education: function (callback) {
            connection.query('CALL get_education_by_id("' + id + '")', function (err, result) {
                if (err) throw err;

                callback(null, result[0][0]);
            });
        },
        ethnicity: function (callback) {
            connection.query('CALL get_ethnicity_by_id("' + id + '")', function (err, result) {
                if (err) throw err;

                callback(null, result[0]);
            });
        },
        eyes: function (callback) {
            connection.query('CALL get_eyes_by_id("' + id + '")', function (err, result) {
                if (err) throw err;

                callback(null, result[0][0]);
            });
        },
        genderRoles: function (callback) {
            connection.query('CALL get_gender_roles_by_id("' + id + '")', function (err, result) {
                if (err) throw err;

                callback(null, result[0][0]);
            });
        },
        handDominates: function (callback) {
            connection.query('CALL get_hand_dominates_by_id("' + id + '")', function (err, result) {
                if (err) throw err;

                callback(null, result[0][0]);
            });
        },
        immigrants: function (callback) {
            connection.query('CALL get_immigrants_by_id("' + id + '")', function (err, result) {
                if (err) throw err;

                callback(null, result[0][0]);
            });
        },
        income: function (callback) {
            connection.query('CALL get_income_by_id("' + id + '")', function (err, result) {
                if (err) throw err;

                callback(null, result[0][0]);
            });
        },
        maritalStatus: function (callback) {
            connection.query('CALL get_marital_status_by_id("' + id + '")', function (err, result) {
                if (err) throw err;

                callback(null, result[0][0]);
            });
        },
        matrices: function (callback) {
            connection.query('CALL get_matrices_by_id("' + id + '")', function (err, result) {
                if (err) throw err;

                callback(null, result[0][0]);
            });
        },
        mocammse: function (callback) {
            connection.query('CALL get_mocammse_by_id("' + id + '")', function (err, result) {
                if (err) throw err;

                callback(null, result[0][0]);
            });
        },
        motorTask: function (callback) {
            connection.query('CALL get_motor_task_by_id("' + id + '")', function (err, result) {
                if (err) throw err;

                callback(null, result[0][0]);
            });
        },
        namingTask: function (callback) {
            connection.query('CALL get_naming_task_by_id("' + id + '")', function (err, result) {
                if (err) throw err;

                callback(null, result[0][0]);
            });
        },
        occupation: function (callback) {
            connection.query('CALL get_occupation_by_id("' + id + '")', function (err, result) {
                if (err) throw err;

                callback(null, result[0][0]);
            });
        },
        pitch: function (callback) {
            connection.query('CALL get_pitch_by_id("' + id + '")', function (err, result) {
                if (err) throw err;

                callback(null, result[0][0]);
            });
        },
        psychologicalTest: function (callback) {
            connection.query('CALL get_psychological_test_by_id("' + id + '")', function (err, result) {
                if (err) throw err;

                callback(null, result[0][0]);
            });
        },
        race: function (callback) {
            connection.query('CALL get_race_by_id("' + id + '")', function (err, result) {
                if (err) throw err;

                callback(null, result[0][0]);
            });
        },
        religion: function (callback) {
            connection.query('CALL get_religion_by_id("' + id + '")', function (err, result) {
                if (err) throw err;

                callback(null, result[0][0]);
            });
        },
        residence: function (callback) {
            connection.query('CALL get_residence_by_id("' + id + '")', function (err, result) {
                if (err) throw err;

                callback(null, result[0][0]);
            });
        },
        reyComplexFigure: function (callback) {
            connection.query('CALL get_rey_complex_figure_by_id("' + id + '")', function (err, result) {
                if (err) throw err;

                callback(null, result[0]);
            });
        },
        reyComplexFigure4: function (callback) {
            connection.query('CALL get_rey_complex_figure_4_by_id("' + id + '")', function (err, result) {
                if (err) throw err;

                callback(null, result[0][0]);
            });
        },
        socialStatus: function (callback) {
            connection.query('CALL get_social_status_by_id("' + id + '")', function (err, result) {
                if (err) throw err;

                callback(null, result[0][0]);
            });
        },
        socialSupport: function (callback) {
            connection.query('CALL get_social_support_by_id("' + id + '")', function (err, result) {
                if (err) throw err;

                callback(null, result[0][0]);
            });
        },
        stroop: function (callback) {
            connection.query('CALL get_stroop_by_id("' + id + '")', function (err, result) {
                if (err) throw err;

                callback(null, result[0][0]);
            });
        },
        trailMaking: function (callback) {
            connection.query('CALL get_trail_making_by_id("' + id + '")', function (err, result) {
                if (err) throw err;

                callback(null, result[0][0]);
            });
        },
        wordlist: function (callback) {
            connection.query('CALL get_wordlist_by_id("' + id + '")', function (err, result) {
                if (err) throw err;

                callback(null, result[0][0]);
            });
        },
        wordlist2: function (callback) {
            connection.query('CALL get_wordlist_2_by_id("' + id + '")', function (err, result) {
                if (err) throw err;

                callback(null, result[0][0]);
            });
        }
    }, function (err, results) {
        if (err) return console.log(err);

        res.json(results);
    });
});

router.post('/participant/:id', function(req, res) {
    var data = req.body;
    var _id = req.params.id;

    console.log(data);

    connection.query('CALL get_participant("' + _id + '")', function(err, result) {
        if (err) throw err;

        var participant = result[0][0];

        // Basic Info
        basic(participant._id, data);

        // Hand Dominate
        hand_dominate(participant._id, data);

        // Race
        race(participant._id, data);

        // Marital Status
        marital_status(participant._id, data);

        // Place of residence
        residence(participant._id, data);

        // Occupation
        occupation(participant._id, data);

        // Income
        income(participant._id, data);

        // Social Status
        social_status(participant._id, data);

        // Education
        education(participant._id, data);

        // Religion
        religion(participant._id, data);

        // Gender Role
        gender_role(participant._id, data);

        // Cultural Values
        cultural_values(participant._id, data);

        // Social Support
        social_support(participant._id, data);

        // Psychological Testing
        psychological_testing(participant._id, data);

        // Immigrants
        immigrants(participant._id, data);

        // Acculturation
        acculturation(participant._id, data);
    });
});

router.post('/participant/:id/:test', function(req, res) {
    var data = req.body;
    var test = req.params.test;

    if (test == 'moca_mmse') {
        // MoCA-MMSE test
        moca(data, res, req);
    } else if (test == 'reyComplexFigure') {
        // Rey Complex Figure test
        rey_complex_figure(data, res, req);
    } else if (test == 'clockDrawing') {
        // Clock Drawing test
        clock_drawing(data, res, req);
    } else if (test == 'reyComplexFigure2') {
        // CPT test
        rey_complex_figure_2(data, res, req);
    } else if (test == 'trailMaking') {
        // CPT test
        trail_making(data, res, req);
    } else if (test == 'pitch') {
        // CPT test
        pitch_recognition(data, res, req);
    } else if (test == 'digitalSpan') {
        // CPT test
        digital_span(data, res, req);
    } else if (test == 'reyComplexFigure3') {
        // CPT test
        rey_complex_figure_3(data, res, req);
    } else if (test == 'reyComplexFigure4') {
        // CPT test
        rey_complex_figure_4(data, res, req);
    } else if (test == 'CPT') {
        // CPT test
        cpt(data, res, req);
    } else if (test == 'matrices') {
        // CPT test
        matrices(data, res, req);
    } else if (test == 'motorTask') {
        // CPT test
        pegboard(data, res, req);
    } else if (test == 'wordlist') {
        // CPT test
        word_list(data, res, req);
    } else if (test == 'stroop') {
        // CPT test
        stroop(data, res, req);
    } else if (test == 'cancellationTest') {
        // CPT test
        cancellation(data, res, req);
    } else if (test == 'wordlist2') {
        // CPT test
        word_list_2(data, res, req);
    } else if (test == 'naming_task') {
        // Nmaing Task test
        naming_task(data, res, req);
    } else if (test == 'comprehension') {
        // Cancellation test
        comprehension(data, res, req);
    } else if (test == 'eyeTest') {
        // CPT test
        eye_test(data, res, req);
    }
});

router.get('/stimuli', function(req, res, next) {
    var rv = {};
    var examples1 = [];
    var examples2 = [];
    var examples3 = [];
    var trials1 = [];
    var trials2 = [];
    var trials3 = [];
    var trials4 = [];
    var trials5 = [];
    var tasks1 = [];
    var tasks2 = [];
    var tasks3 = [];
    var tasks4 = [];
    var tasks5 = [];
    var tasks6 = [];
    var tasks7 = [];
    var tasks8 = [];
    var tasks9 = [];
    var tasks10 = [];
    var tasks11 = [];
    var tasks12 = [];
    var tasks13 = [];
    var tasks14 = [];
    var tasks15 = [];
    var tasks16 = [];
    var tasks17 = [];
    var tasks18 = [];
    var tasks19 = [];
    var tasks20 = [];
    var tasks21 = [];
    var tasks22 = [];
    var tasks23 = [];
    var tasks24 = [];

    var example1 = fs.readdirSync(__dirname + '/../public/audios/pitch/examples/example1');
    var example2 = fs.readdirSync(__dirname + '/../public/audios/pitch/examples/example2');
    var example3 = fs.readdirSync(__dirname + '/../public/audios/pitch/examples/example3');
    var trial1 = fs.readdirSync(__dirname + '/../public/audios/pitch/practice_trials/practice1');
    var trial2 = fs.readdirSync(__dirname + '/../public/audios/pitch/practice_trials/practice2');
    var trial3 = fs.readdirSync(__dirname + '/../public/audios/pitch/practice_trials/practice3');
    var trial4 = fs.readdirSync(__dirname + '/../public/audios/pitch/practice_trials/practice4');
    var trial5 = fs.readdirSync(__dirname + '/../public/audios/pitch/practice_trials/practice5');
    var task1 = fs.readdirSync(__dirname + '/../public/audios/pitch/1');
    var task2 = fs.readdirSync(__dirname + '/../public/audios/pitch/2');
    var task3 = fs.readdirSync(__dirname + '/../public/audios/pitch/3');
    var task4 = fs.readdirSync(__dirname + '/../public/audios/pitch/4');
    var task5 = fs.readdirSync(__dirname + '/../public/audios/pitch/5');
    var task6 = fs.readdirSync(__dirname + '/../public/audios/pitch/6');
    var task7 = fs.readdirSync(__dirname + '/../public/audios/pitch/7');
    var task8 = fs.readdirSync(__dirname + '/../public/audios/pitch/8');
    var task9 = fs.readdirSync(__dirname + '/../public/audios/pitch/9');
    var task10 = fs.readdirSync(__dirname + '/../public/audios/pitch/10');
    var task11 = fs.readdirSync(__dirname + '/../public/audios/pitch/11');
    var task12 = fs.readdirSync(__dirname + '/../public/audios/pitch/12');
    var task13 = fs.readdirSync(__dirname + '/../public/audios/pitch/13');
    var task14 = fs.readdirSync(__dirname + '/../public/audios/pitch/14');
    var task15 = fs.readdirSync(__dirname + '/../public/audios/pitch/15');
    var task16 = fs.readdirSync(__dirname + '/../public/audios/pitch/16');
    var task17 = fs.readdirSync(__dirname + '/../public/audios/pitch/17');
    var task18 = fs.readdirSync(__dirname + '/../public/audios/pitch/18');
    var task19 = fs.readdirSync(__dirname + '/../public/audios/pitch/19');
    var task20 = fs.readdirSync(__dirname + '/../public/audios/pitch/20');
    var task21 = fs.readdirSync(__dirname + '/../public/audios/pitch/21');
    var task22 = fs.readdirSync(__dirname + '/../public/audios/pitch/22');
    var task23 = fs.readdirSync(__dirname + '/../public/audios/pitch/23');
    var task24 = fs.readdirSync(__dirname + '/../public/audios/pitch/24');

    example1.forEach(function(f) {
        examples1.push('http://api.girlscouts.harryatwal.com/static_audios/pitch/examples/example1/' + f);
    });

    example2.forEach(function(f) {
        examples2.push('http://api.girlscouts.harryatwal.com/static_audios/pitch/examples/example2/' + f);
    });

    example3.forEach(function(f) {
        examples3.push('http://api.girlscouts.harryatwal.com/static_audios/pitch/examples/example3/' + f);
    });

    trial1.forEach(function(f) {
        trials1.push('http://api.girlscouts.harryatwal.com/static_audios/pitch/practice_trials/practice1/' + f);
    });

    trial2.forEach(function(f) {
        trials2.push('http://api.girlscouts.harryatwal.com/static_audios/pitch/practice_trials/practice2/' + f);
    });

    trial3.forEach(function(f) {
        trials3.push('http://api.girlscouts.harryatwal.com/static_audios/pitch/practice_trials/practice3/' + f);
    });

    trial4.forEach(function(f) {
        trials4.push('http://api.girlscouts.harryatwal.com/static_audios/pitch/practice_trials/practice4/' + f);
    });

    trial5.forEach(function(f) {
        trials5.push('http://api.girlscouts.harryatwal.com/static_audios/pitch/practice_trials/practice5/' + f);
    });

    task1.forEach(function(f) {
        tasks1.push('http://api.girlscouts.harryatwal.com/static_audios/pitch/1/' + f);
    });

    task2.forEach(function(f) {
        tasks2.push('http://api.girlscouts.harryatwal.com/static_audios/pitch/2/' + f);
    });

    task3.forEach(function(f) {
        tasks3.push('http://api.girlscouts.harryatwal.com/static_audios/pitch/3/' + f);
    });

    task4.forEach(function(f) {
        tasks4.push('http://api.girlscouts.harryatwal.com/static_audios/pitch/4/' + f);
    });

    task5.forEach(function(f) {
        tasks5.push('http://api.girlscouts.harryatwal.com/static_audios/pitch/5/' + f);
    });

    task6.forEach(function(f) {
        tasks6.push('http://api.girlscouts.harryatwal.com/static_audios/pitch/6/' + f);
    });

    task7.forEach(function(f) {
        tasks7.push('http://api.girlscouts.harryatwal.com/static_audios/pitch/7/' + f);
    });

    task8.forEach(function(f) {
        tasks8.push('http://api.girlscouts.harryatwal.com/static_audios/pitch/8/' + f);
    });

    task9.forEach(function(f) {
        tasks9.push('http://api.girlscouts.harryatwal.com/static_audios/pitch/9/' + f);
    });

    task10.forEach(function(f) {
        tasks10.push('http://api.girlscouts.harryatwal.com/static_audios/pitch/10/' + f);
    });

    task11.forEach(function(f) {
        tasks11.push('http://api.girlscouts.harryatwal.com/static_audios/pitch/11/' + f);
    });

    task12.forEach(function(f) {
        tasks12.push('http://api.girlscouts.harryatwal.com/static_audios/pitch/12/' + f);
    });

    task13.forEach(function(f) {
        tasks13.push('http://api.girlscouts.harryatwal.com/static_audios/pitch/13/' + f);
    });

    task14.forEach(function(f) {
        tasks14.push('http://api.girlscouts.harryatwal.com/static_audios/pitch/14/' + f);
    });

    task15.forEach(function(f) {
        tasks15.push('http://api.girlscouts.harryatwal.com/static_audios/pitch/15/' + f);
    });

    task16.forEach(function(f) {
        tasks16.push('http://api.girlscouts.harryatwal.com/static_audios/pitch/16/' + f);
    });

    task17.forEach(function(f) {
        tasks17.push('http://api.girlscouts.harryatwal.com/static_audios/pitch/17/' + f);
    });

    task18.forEach(function(f) {
        tasks18.push('http://api.girlscouts.harryatwal.com/static_audios/pitch/18/' + f);
    });

    task19.forEach(function(f) {
        tasks19.push('http://api.girlscouts.harryatwal.com/static_audios/pitch/19/' + f);
    });

    task20.forEach(function(f) {
        tasks20.push('http://api.girlscouts.harryatwal.com/static_audios/pitch/20/' + f);
    });

    task21.forEach(function(f) {
        tasks21.push('http://api.girlscouts.harryatwal.com/static_audios/pitch/21/' + f);
    });

    task22.forEach(function(f) {
        tasks22.push('http://api.girlscouts.harryatwal.com/static_audios/pitch/22/' + f);
    });

    task23.forEach(function(f) {
        tasks23.push('http://api.girlscouts.harryatwal.com/static_audios/pitch/23/' + f);
    });

    task24.forEach(function(f) {
        tasks24.push('http://api.girlscouts.harryatwal.com/static_audios/pitch/24/' + f);
    });

    var examples = [examples1, examples2, examples3];
    var trials = [trials1, trials2, trials3, trials4, trials5];
    var tasks = [
        tasks1, tasks2, tasks3, tasks4, tasks5, tasks6, tasks7, tasks8, tasks9, tasks10, tasks11, tasks12, tasks13, tasks14, tasks15, tasks16, tasks17, tasks18, tasks19, tasks20, tasks21, tasks22, tasks23, tasks24
    ];

    var forwards = [];
    var backwards = [];

    var forward = fs.readdirSync(__dirname + '/../public/audios/digital_span/english/forward');
    var backward = fs.readdirSync(__dirname + '/../public/audios/digital_span/english/backward');

    forward.forEach(function(f) {
        forwards.push('http://api.girlscouts.harryatwal.com/static_audios/digital_span/english/forward/' + f);
    });

    backward.forEach(function(f) {
        backwards.push('http://api.girlscouts.harryatwal.com/static_audios/digital_span/english/backward/' + f);
    });

    var images = [];
    var videos = [];

    var image = fs.readdirSync(__dirname + '/../public/images/stroop/english');
    var video = fs.readdirSync(__dirname + '/../public/videos/stroop/english');

    image.forEach(function(f) {
        images.push('http://api.girlscouts.harryatwal.com/static_images/stroop/english/' + f);
    });

    video.forEach(function(f) {
        videos.push('http://api.girlscouts.harryatwal.com/static_videos/stroop/english/' + f);
    });

    var wordlist_trials = [];
    var wordlist_tasks = [];

    var trial = fs.readdirSync(__dirname + '/../public/audios/word_list/english/trials');
    var task = fs.readdirSync(__dirname + '/../public/audios/word_list/english/recognition');

    trial.forEach(function(f) {
        wordlist_trials.push('http://api.girlscouts.harryatwal.com/static_audios/word_list/english/trials/' + f);
    });

    task.forEach(function(f) {
        wordlist_tasks.push('http://api.girlscouts.harryatwal.com/static_audios/word_list/english/recognition/' + f);
    });

    var taskImages = [];
    var practiceImages = [];

    var practice = fs.readdirSync(__dirname + '/../public/images/naming_task/practice');
    var namingTask = fs.readdirSync(__dirname + '/../public/images/naming_task/task');

    practice.forEach(function(f) {
        practiceImages.push('http://api.girlscouts.harryatwal.com/static_images/naming_task/practice/' + f);
    });

    namingTask.forEach(function(f) {
        taskImages.push('http://api.girlscouts.harryatwal.com/static_images/naming_task/task/' + f);
    });



    var pitch = {};
    var digital_span = {};
    var stroop = {};
    var wordlist = {};
    var naming_task = {};

    pitch.examples = examples;
    pitch.trials = trials;
    pitch.tasks = tasks;

    digital_span.forward = forwards;
    digital_span.backward = backwards;

    stroop.images = images;
    stroop.videos = videos;

    wordlist.trials = wordlist_trials;
    wordlist.tasks = wordlist_tasks;

    naming_task.practice = practiceImages;
    naming_task.tasks = taskImages;

    rv.pitch = pitch;
    rv.digital_span = digital_span;
    rv.stroop = stroop;
    rv.wordlist = wordlist;
    rv.naming_task = naming_task;

    res.json(rv);
});

router.get('/stimuli/:test', function(req, res, next) {
    var rv = {};

    switch(req.params.test) {
        case "pitch":
            var examples1 = [];
            var examples2 = [];
            var examples3 = [];
            var trials1 = [];
            var trials2 = [];
            var trials3 = [];
            var trials4 = [];
            var trials5 = [];
            var tasks1 = [];
            var tasks2 = [];
            var tasks3 = [];
            var tasks4 = [];
            var tasks5 = [];
            var tasks6 = [];
            var tasks7 = [];
            var tasks8 = [];
            var tasks9 = [];
            var tasks10 = [];
            var tasks11 = [];
            var tasks12 = [];
            var tasks13 = [];
            var tasks14 = [];
            var tasks15 = [];
            var tasks16 = [];
            var tasks17 = [];
            var tasks18 = [];
            var tasks19 = [];
            var tasks20 = [];
            var tasks21 = [];
            var tasks22 = [];
            var tasks23 = [];
            var tasks24 = [];

            var example1 = fs.readdirSync(__dirname + '/../public/audios/pitch/examples/example1');
            var example2 = fs.readdirSync(__dirname + '/../public/audios/pitch/examples/example2');
            var example3 = fs.readdirSync(__dirname + '/../public/audios/pitch/examples/example3');
            var trial1 = fs.readdirSync(__dirname + '/../public/audios/pitch/practice_trials/practice1');
            var trial2 = fs.readdirSync(__dirname + '/../public/audios/pitch/practice_trials/practice2');
            var trial3 = fs.readdirSync(__dirname + '/../public/audios/pitch/practice_trials/practice3');
            var trial4 = fs.readdirSync(__dirname + '/../public/audios/pitch/practice_trials/practice4');
            var trial5 = fs.readdirSync(__dirname + '/../public/audios/pitch/practice_trials/practice5');
            var task1 = fs.readdirSync(__dirname + '/../public/audios/pitch/1');
            var task2 = fs.readdirSync(__dirname + '/../public/audios/pitch/2');
            var task3 = fs.readdirSync(__dirname + '/../public/audios/pitch/3');
            var task4 = fs.readdirSync(__dirname + '/../public/audios/pitch/4');
            var task5 = fs.readdirSync(__dirname + '/../public/audios/pitch/5');
            var task6 = fs.readdirSync(__dirname + '/../public/audios/pitch/6');
            var task7 = fs.readdirSync(__dirname + '/../public/audios/pitch/7');
            var task8 = fs.readdirSync(__dirname + '/../public/audios/pitch/8');
            var task9 = fs.readdirSync(__dirname + '/../public/audios/pitch/9');
            var task10 = fs.readdirSync(__dirname + '/../public/audios/pitch/10');
            var task11 = fs.readdirSync(__dirname + '/../public/audios/pitch/11');
            var task12 = fs.readdirSync(__dirname + '/../public/audios/pitch/12');
            var task13 = fs.readdirSync(__dirname + '/../public/audios/pitch/13');
            var task14 = fs.readdirSync(__dirname + '/../public/audios/pitch/14');
            var task15 = fs.readdirSync(__dirname + '/../public/audios/pitch/15');
            var task16 = fs.readdirSync(__dirname + '/../public/audios/pitch/16');
            var task17 = fs.readdirSync(__dirname + '/../public/audios/pitch/17');
            var task18 = fs.readdirSync(__dirname + '/../public/audios/pitch/18');
            var task19 = fs.readdirSync(__dirname + '/../public/audios/pitch/19');
            var task20 = fs.readdirSync(__dirname + '/../public/audios/pitch/20');
            var task21 = fs.readdirSync(__dirname + '/../public/audios/pitch/21');
            var task22 = fs.readdirSync(__dirname + '/../public/audios/pitch/22');
            var task23 = fs.readdirSync(__dirname + '/../public/audios/pitch/23');
            var task24 = fs.readdirSync(__dirname + '/../public/audios/pitch/24');

            example1.forEach(function(f) {
                examples1.push(f);
            });

            example2.forEach(function(f) {
                examples2.push(f);
            });

            example3.forEach(function(f) {
                examples3.push(f);
            });

            trial1.forEach(function(f) {
                trials1.push(f);
            });

            trial2.forEach(function(f) {
                trials2.push(f);
            });

            trial3.forEach(function(f) {
                trials3.push(f);
            });

            trial4.forEach(function(f) {
                trials4.push(f);
            });

            trial5.forEach(function(f) {
                trials5.push(f);
            });

            task1.forEach(function(f) {
                tasks1.push(f);
            });

            task2.forEach(function(f) {
                tasks2.push(f);
            });

            task3.forEach(function(f) {
                tasks3.push(f);
            });

            task4.forEach(function(f) {
                tasks4.push(f);
            });

            task5.forEach(function(f) {
                tasks5.push(f);
            });

            task6.forEach(function(f) {
                tasks6.push(f);
            });

            task7.forEach(function(f) {
                tasks7.push(f);
            });

            task8.forEach(function(f) {
                tasks8.push(f);
            });

            task9.forEach(function(f) {
                tasks9.push(f);
            });

            task10.forEach(function(f) {
                tasks10.push(f);
            });

            task11.forEach(function(f) {
                tasks11.push(f);
            });

            task12.forEach(function(f) {
                tasks12.push(f);
            });

            task13.forEach(function(f) {
                tasks13.push(f);
            });

            task14.forEach(function(f) {
                tasks14.push(f);
            });

            task15.forEach(function(f) {
                tasks15.push(f);
            });

            task16.forEach(function(f) {
                tasks16.push(f);
            });

            task17.forEach(function(f) {
                tasks17.push(f);
            });

            task18.forEach(function(f) {
                tasks18.push(f);
            });

            task19.forEach(function(f) {
                tasks19.push(f);
            });

            task20.forEach(function(f) {
                tasks20.push(f);
            });

            task21.forEach(function(f) {
                tasks21.push(f);
            });

            task22.forEach(function(f) {
                tasks22.push(f);
            });

            task23.forEach(function(f) {
                tasks23.push(f);
            });

            task24.forEach(function(f) {
                tasks24.push(f);
            });

            var examples = [examples1, examples2, examples3];
            var trials = [trials1, trials2, trials3, trials4, trials5];
            var tasks = [
                tasks1, tasks2, tasks3, tasks4, tasks5, tasks6, tasks7, tasks8, tasks9, tasks10, tasks11, tasks12, tasks13, tasks14, tasks15, tasks16, tasks17, tasks18, tasks19, tasks20, tasks21, tasks22, tasks23, tasks24
            ];

            var pitch = {};

            pitch.examples = examples;
            pitch.trials = trials;
            pitch.tasks = tasks;

            rv = pitch;
            res.json(rv);
            break;

        case "namingtask" :
            var taskImages = [];
            var practiceImages = [];

            var practice = fs.readdirSync(__dirname + '/../public/images/naming_task/practice');
            var namingTask = fs.readdirSync(__dirname + '/../public/images/naming_task/task');

            practice.forEach(function(f) {
                practiceImages.push(url + '/static_images/naming_task/practice/' + f);
            });

            namingTask.forEach(function(f) {
                taskImages.push(url + '/static_images/naming_task/task/' + f);
            });

            var naming = {};

            naming.practice = practiceImages;
            naming.task = taskImages;

            res.json(naming);

            break;

        case "wordlist":
            var wordlist = {};
            var wordlist_trials = [];

            var trial = fs.readdirSync(__dirname + '/../public/audios/word_list/english/trials');

            trial.forEach(function(f) {
                wordlist_trials.push('http://api.girlscouts.harryatwal.com/static_audios/word_list/english/trials/' + f);
            });

            wordlist.trials = wordlist_trials;
            res.json(wordlist);
    }


    // var forwards = [];
    // var backwards = [];
    //
    // var forward = fs.readdirSync(__dirname + '/../public/audios/digital_span/english/forward');
    // var backward = fs.readdirSync(__dirname + '/../public/audios/digital_span/english/backward');
    //
    // forward.forEach(function(f) {
    //     forwards.push('http://api.girlscouts.harryatwal.com/static_audios/digital_span/english/forward/' + f);
    // });
    //
    // backward.forEach(function(f) {
    //     backwards.push('http://api.girlscouts.harryatwal.com/static_audios/digital_span/english/backward/' + f);
    // });
    //
    // var images = [];
    // var videos = [];
    //
    // var image = fs.readdirSync(__dirname + '/../public/images/stroop/english');
    // var video = fs.readdirSync(__dirname + '/../public/videos/stroop/english');
    //
    // image.forEach(function(f) {
    //     images.push('http://api.girlscouts.harryatwal.com/static_images/stroop/english/' + f);
    // });
    //
    // video.forEach(function(f) {
    //     videos.push('http://api.girlscouts.harryatwal.com/static_videos/stroop/english/' + f);
    // });
    //
    // var wordlist_trials = [];
    // var wordlist_tasks = [];
    //
    // var trial = fs.readdirSync(__dirname + '/../public/audios/word_list/english/trials');
    // var task = fs.readdirSync(__dirname + '/../public/audios/word_list/english/recognition');
    //
    // trial.forEach(function(f) {
    //     wordlist_trials.push('http://api.girlscouts.harryatwal.com/static_audios/word_list/english/trials/' + f);
    // });
    //
    // task.forEach(function(f) {
    //     wordlist_tasks.push('http://api.girlscouts.harryatwal.com/static_audios/word_list/english/recognition/' + f);
    // });
    //

    //
    //
    //
    //
    // var digital_span = {};
    // var stroop = {};
    // var wordlist = {};
    // var naming_task = {};
    //
    //
    //
    // digital_span.forward = forwards;
    // digital_span.backward = backwards;
    //
    // stroop.images = images;
    // stroop.videos = videos;
    //
    // wordlist.trials = wordlist_trials;
    // wordlist.tasks = wordlist_tasks;
    //
    // naming_task.practice = practiceImages;
    // naming_task.tasks = taskImages;
    //
    //
    // rv.digital_span = digital_span;
    // rv.stroop = stroop;
    // rv.wordlist = wordlist;
    // rv.naming_task = naming_task;


});

router.get('/stimuliNames', function(req, res, next) {
    var rv = {};
    var examples1 = [];
    var examples2 = [];
    var examples3 = [];
    var trials1 = [];
    var trials2 = [];
    var trials3 = [];
    var trials4 = [];
    var trials5 = [];
    var tasks1 = [];
    var tasks2 = [];
    var tasks3 = [];
    var tasks4 = [];
    var tasks5 = [];
    var tasks6 = [];
    var tasks7 = [];
    var tasks8 = [];
    var tasks9 = [];
    var tasks10 = [];
    var tasks11 = [];
    var tasks12 = [];
    var tasks13 = [];
    var tasks14 = [];
    var tasks15 = [];
    var tasks16 = [];
    var tasks17 = [];
    var tasks18 = [];
    var tasks19 = [];
    var tasks20 = [];
    var tasks21 = [];
    var tasks22 = [];
    var tasks23 = [];
    var tasks24 = [];

    var example1 = fs.readdirSync(__dirname + '/../public/audios/pitch/examples/example1');
    var example2 = fs.readdirSync(__dirname + '/../public/audios/pitch/examples/example2');
    var example3 = fs.readdirSync(__dirname + '/../public/audios/pitch/examples/example3');
    var trial1 = fs.readdirSync(__dirname + '/../public/audios/pitch/practice_trials/practice1');
    var trial2 = fs.readdirSync(__dirname + '/../public/audios/pitch/practice_trials/practice2');
    var trial3 = fs.readdirSync(__dirname + '/../public/audios/pitch/practice_trials/practice3');
    var trial4 = fs.readdirSync(__dirname + '/../public/audios/pitch/practice_trials/practice4');
    var trial5 = fs.readdirSync(__dirname + '/../public/audios/pitch/practice_trials/practice5');
    var task1 = fs.readdirSync(__dirname + '/../public/audios/pitch/1');
    var task2 = fs.readdirSync(__dirname + '/../public/audios/pitch/2');
    var task3 = fs.readdirSync(__dirname + '/../public/audios/pitch/3');
    var task4 = fs.readdirSync(__dirname + '/../public/audios/pitch/4');
    var task5 = fs.readdirSync(__dirname + '/../public/audios/pitch/5');
    var task6 = fs.readdirSync(__dirname + '/../public/audios/pitch/6');
    var task7 = fs.readdirSync(__dirname + '/../public/audios/pitch/7');
    var task8 = fs.readdirSync(__dirname + '/../public/audios/pitch/8');
    var task9 = fs.readdirSync(__dirname + '/../public/audios/pitch/9');
    var task10 = fs.readdirSync(__dirname + '/../public/audios/pitch/10');
    var task11 = fs.readdirSync(__dirname + '/../public/audios/pitch/11');
    var task12 = fs.readdirSync(__dirname + '/../public/audios/pitch/12');
    var task13 = fs.readdirSync(__dirname + '/../public/audios/pitch/13');
    var task14 = fs.readdirSync(__dirname + '/../public/audios/pitch/14');
    var task15 = fs.readdirSync(__dirname + '/../public/audios/pitch/15');
    var task16 = fs.readdirSync(__dirname + '/../public/audios/pitch/16');
    var task17 = fs.readdirSync(__dirname + '/../public/audios/pitch/17');
    var task18 = fs.readdirSync(__dirname + '/../public/audios/pitch/18');
    var task19 = fs.readdirSync(__dirname + '/../public/audios/pitch/19');
    var task20 = fs.readdirSync(__dirname + '/../public/audios/pitch/20');
    var task21 = fs.readdirSync(__dirname + '/../public/audios/pitch/21');
    var task22 = fs.readdirSync(__dirname + '/../public/audios/pitch/22');
    var task23 = fs.readdirSync(__dirname + '/../public/audios/pitch/23');
    var task24 = fs.readdirSync(__dirname + '/../public/audios/pitch/24');

    example1.forEach(function(f) {
        examples1.push(f);
    });

    example2.forEach(function(f) {
        examples2.push(f);
    });

    example3.forEach(function(f) {
        examples3.push(f);
    });

    trial1.forEach(function(f) {
        trials1.push(f);
    });

    trial2.forEach(function(f) {
        trials2.push(f);
    });

    trial3.forEach(function(f) {
        trials3.push(f);
    });

    trial4.forEach(function(f) {
        trials4.push(f);
    });

    trial5.forEach(function(f) {
        trials5.push(f);
    });

    task1.forEach(function(f) {
        tasks1.push(f);
    });

    task2.forEach(function(f) {
        tasks2.push(f);
    });

    task3.forEach(function(f) {
        tasks3.push(f);
    });

    task4.forEach(function(f) {
        tasks4.push(f);
    });

    task5.forEach(function(f) {
        tasks5.push(f);
    });

    task6.forEach(function(f) {
        tasks6.push(f);
    });

    task7.forEach(function(f) {
        tasks7.push(f);
    });

    task8.forEach(function(f) {
        tasks8.push(f);
    });

    task9.forEach(function(f) {
        tasks9.push(f);
    });

    task10.forEach(function(f) {
        tasks10.push(f);
    });

    task11.forEach(function(f) {
        tasks11.push(f);
    });

    task12.forEach(function(f) {
        tasks12.push(f);
    });

    task13.forEach(function(f) {
        tasks13.push(f);
    });

    task14.forEach(function(f) {
        tasks14.push(f);
    });

    task15.forEach(function(f) {
        tasks15.push(f);
    });

    task16.forEach(function(f) {
        tasks16.push(f);
    });

    task17.forEach(function(f) {
        tasks17.push(f);
    });

    task18.forEach(function(f) {
        tasks18.push(f);
    });

    task19.forEach(function(f) {
        tasks19.push(f);
    });

    task20.forEach(function(f) {
        tasks20.push(f);
    });

    task21.forEach(function(f) {
        tasks21.push(f);
    });

    task22.forEach(function(f) {
        tasks22.push(f);
    });

    task23.forEach(function(f) {
        tasks23.push(f);
    });

    task24.forEach(function(f) {
        tasks24.push(f);
    });

    var examples = [examples1, examples2, examples3];
    var trials = [trials1, trials2, trials3, trials4, trials5];
    var tasks = [
        tasks1, tasks2, tasks3, tasks4, tasks5, tasks6, tasks7, tasks8, tasks9, tasks10, tasks11, tasks12, tasks13, tasks14, tasks15, tasks16, tasks17, tasks18, tasks19, tasks20, tasks21, tasks22, tasks23, tasks24
    ];

    var forwards = [];
    var backwards = [];

    var forward = fs.readdirSync(__dirname + '/../public/audios/digital_span/english/forward');
    var backward = fs.readdirSync(__dirname + '/../public/audios/digital_span/english/backward');

    forward.forEach(function(f) {
        forwards.push(f);
    });

    backward.forEach(function(f) {
        backwards.push(f);
    });

    var images = [];
    var videos = [];

    var image = fs.readdirSync(__dirname + '/../public/images/stroop/english');
    var video = fs.readdirSync(__dirname + '/../public/videos/stroop/english');

    image.forEach(function(f) {
        images.push(f);
    });

    video.forEach(function(f) {
        videos.push(f);
    });

    var wordlist_trials = [];
    var wordlist_tasks = [];

    var trial = fs.readdirSync(__dirname + '/../public/audios/word_list/english/trials');
    var task = fs.readdirSync(__dirname + '/../public/audios/word_list/english/recognition');

    trial.forEach(function(f) {
        wordlist_trials.push(f);
    });

    task.forEach(function(f) {
        wordlist_tasks.push(f);
    });

    var taskImages = [];
    var practiceImages = [];

    var practice = fs.readdirSync(__dirname + '/../public/images/naming_task/practice');
    var namingTask = fs.readdirSync(__dirname + '/../public/images/naming_task/task');

    practice.forEach(function(f) {
        practiceImages.push(f);
    });

    namingTask.forEach(function(f) {
        taskImages.push(f);
    });



    var pitch = {};
    var digital_span = {};
    var stroop = {};
    var wordlist = {};
    var naming_task = {};

    pitch.examples = examples;
    pitch.trials = trials;
    pitch.tasks = tasks;

    digital_span.forward = forwards;
    digital_span.backward = backwards;

    stroop.images = images;
    stroop.videos = videos;

    wordlist.trials = wordlist_trials;
    wordlist.tasks = wordlist_tasks;

    naming_task.practice = practiceImages;
    naming_task.tasks = taskImages;

    rv.pitch = pitch;
    rv.digital_span = digital_span;
    rv.stroop = stroop;
    rv.wordlist = wordlist;
    rv.naming_task = naming_task;

    res.json(rv);
});

router.get('/pilot', function(req, res) {
    var ids = [];

    connection.query('CALL get_participants_id()', function(err, result) {
        if (err) throw err;

        result[0].forEach(function (value) {
            ids.push(value._id);
        });

        var participants = [];

        for (var i = 0; i < ids.length; i++) {
            async.parallel({
                participant: function (callback) {
                    connection.query('CALL get_participant("' + ids[i] + '")', function (err, result) {
                        if (err) throw err;

                        if (result[0][0].dob != null) {
                            result[0][0].age = _calculateAge(result[0][0].dob);
                        }

                        callback(null, result[0][0]);
                    });
                },
                namingTask: function (callback) {
                    connection.query('CALL get_naming_task_by_id("' + ids[i] + '")', function (err, result) {
                        if (err) throw err;

                        if (result[0][0] == null) {
                            callback(null, []);
                        } else {
                            callback(null, result[0][0]);
                        }
                    });
                },
                comprehension: function (callback) {
                    connection.query('CALL get_comprehension_by_id("' + ids[i] + '")', function (err, result) {
                        if (err) throw err;

                        if (result[0][0] == null) {
                            callback(null, []);
                        } else {
                            callback(null, result[0][0]);
                        }
                    });
                },
                wordlist: function (callback) {
                    connection.query('CALL get_wordlist_by_id("' + ids[i] + '")', function (err, result) {
                        if (err) throw err;

                        if (result[0][0] == null) {
                            callback(null, []);
                        } else {
                            callback(null, result[0][0]);
                        }
                    });
                },
                wordlist2: function (callback) {
                    connection.query('CALL get_wordlist_2_by_id("' + ids[i] + '")', function (err, result) {
                        if (err) throw err;

                        if (result[0][0] == null) {
                            callback(null, []);
                        } else {
                            callback(null, result[0][0]);
                        }
                    });
                },
                eyes: function (callback) {
                    connection.query('CALL get_eyes_by_id("' + ids[i] + '")', function (err, result) {
                        if (err) throw err;

                        if (result[0][0] == null) {
                            callback(null, []);
                        } else {
                            callback(null, result[0][0]);
                        }
                    });
                },
                pitch: function (callback) {
                    connection.query('CALL get_pitch_by_id("' + ids[i] + '")', function (err, result) {
                        if (err) throw err;

                        if (result[0][0] == null) {
                            callback(null, []);
                        } else {
                            callback(null, result[0][0]);
                        }
                    });
                },
                trailMaking: function (callback) {
                    connection.query('CALL get_trail_making_by_id("' + ids[i] + '")', function (err, result) {
                        if (err) throw err;

                        if (result[0][0] == null) {
                            callback(null, []);
                        } else {
                            callback(null, result[0][0]);
                        }
                    });
                },
                clockDrawing: function (callback) {
                    connection.query('CALL get_clock_drawing_by_id("' + ids[i] + '")', function (err, result) {
                        if (err) throw err;

                        if (result[0][0] == null) {
                            callback(null, []);
                        } else {
                            callback(null, result[0][0]);
                        }
                    });
                },
                reyComplexFigure: function (callback) {
                    connection.query('CALL get_rey_complex_figure_by_id("' + ids[i] + '")', function (err, result) {
                        if (err) throw err;

                        if (result[0][0] == null) {
                            callback(null, []);
                        } else {
                            callback(null, result[0]);
                        }
                    });
                },
                reyComplexFigure4: function (callback) {
                    connection.query('CALL get_rey_complex_figure_4_by_id("' + ids[i] + '")', function (err, result) {
                        if (err) throw err;

                        if (result[0][0] == null) {
                            callback(null, []);
                        } else {
                            callback(null, result[0][0]);
                        }
                    });
                },
                stroop: function (callback) {
                    connection.query('CALL get_stroop_by_id("' + ids[i] + '")', function (err, result) {
                        if (err) throw err;

                        if (result[0][0] == null) {
                            callback(null, []);
                        } else {
                            callback(null, result[0][0]);
                        }
                    });
                },
                digitalSpan: function (callback) {
                    connection.query('CALL get_digital_span_by_id("' + ids[i] + '")', function (err, result) {
                        if (err) throw err;

                        if (result[0][0] == null) {
                            callback(null, []);
                        } else {
                            callback(null, result[0][0]);
                        }
                    });
                }
            }, function (err, results) {
                if (err) return console.log(err);

                participants.push(results);

                if (0 === --ids.length) {
                    var users = [];

                    for (var i = 0; i < participants.length; i++) {
                        var data = participants[i];
                        var user = {};

                        user._id = data.participant._id;
                        user.DOB = data.participant.dob;

                        if (data.participant.gender == 'm') {
                            user.GENDER = 1;
                        } else if (data.participant.gender == 'f') {
                            user.GENDER = 2;
                        } else if (data.participant.gender == 'o') {
                            user.GENDER = 3;
                        }

                        var date = new Date(data.participant.timestamp);

                        user.REAL_date = date.getMonth() + "/" + date.getDay() + "/" + date.getFullYear();
                        user.REAL_time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
                        user.REAL_AMPM = date.getHours() < 12 ? "AM" : "PM";
                        user.REAL_dayOfWeek = data.participant.dayOfWeek;
                        user.REAL_country = data.participant.country;
                        user.REAL_county = data.participant.county;
                        user.REAL_city = data.participant.city;
                        user.REAL_location = data.participant.location;
                        user.REAL_floor = data.participant.floor;

                        // Naming Task
                        csvNaming(user, data);
                        csvComprehension(user, data);
                        csvWordList(user, data);
                        csvWordList2(user, data);
                        csvEyes(user, data);
                        csvPitchRecognition(user, data);
                        csvTrailMaking(user, data);
                        csvClockDrawing(user, data);
                        csvRCF(user, data);
                        csvRCF4(user, data);
                        csvStroop(user, data);
                        csvDigitsSpan(user, data);

                        users.push(user);
                    }

                    var json2csvCallback = function (err, csv) {
                        if (err) throw err;
                        // console.log(csv);
                        res.set('Content-Type', 'text/csv');
                        res.send(csv);
                    };

                    converter.json2csv(users, json2csvCallback);
                }
            });
        }
    });
});

router.get('/csv', function(req, res) {
    var ids = [];
    var acculturation = [];
    var cancellation = [];
    var fields = [
        "americanImportant",
        "beingOfCulture",
        "beingOfCultureProud",
        "correct",
        "englishfriends",
        "englishgeneral",
        "englishnewspaper",
        "englishphone",
        "englishschool",
        "englishsongs",
        "englishstranger",
        "englishtv",
        "englishugeneral",
        "feelAmericanCulture",
        "feelingGoodAmerican",
        "incorrect",
        "knowAmericanActor",
        "knowAmericanHeroes",
        "knowAmericanHistory",
        "knowAmericanLeader",
        "knowAmericanNewspaper",
        "knowAmericantv",
        "knowNativeActor",
        "knowNativeHeroes",
        "knowNativeHistory",
        "knowNativeLeader",
        "knowNativeNewspaper",
        "knowNativetv",
        "myCultureBeing",
        "myCultureBeingGood",
        "myCultureImportInLife",
        "myselfBeingAmerican",
        "nativefamily",
        "nativefriends",
        "nativegeneral",
        "nativenewspaper",
        "nativephone",
        "nativesongs",
        "nativestrangers",
        "nativetv",
        "nativeugeneral",
        "partOfCulture",
        "proudAmerican",
        "strongBeingAmerican",
        "REAL_date",
        "REAL_time",
        "REAL_AMPM",
        "ORIENT_year",
        "ORIENT_month",
        "ORIENT_day",
        "ORIENT_dayweek",
        "ORIENT_hour",
        "ORIENT_minutes",
        "ORIENT_AMPM",
        "ORIENT_country",
        "ORIENT_county",
        "ORIENT_city",
        "ORIENT_location",
        "ORIENT_floor",
        "RCF1_Time",
        "RCF1_file",
        "RCF1_Score",
        "RCF2_Time",
        "RCF2_file",
        "RCF2_Score",
        "RCF3_Time",
        "RCF3_file",
        "RCF3_Score",
        "RCF4_1",
        "RCF4_2",
        "RCF4_3",
        "RCF4_4",
        "RCF4_5",
        "RCF4_6",
        "RCF4_7",
        "RCF4_8",
        "RCF4_9",
        "RCF4_10",
        "RCF4_11",
        "RCF4_12",
        "RCF4_13",
        "RCF4_14",
        "RCF4_15",
        "RCF4_16",
        "RCF4_17",
        "RCF4_18",
        "RCF4_19",
        "RCF4_20",
        "RCF4_21",
        "RCF4_22",
        "RCF4_23",
        "RCF4_24",
        "RCF4_Hits",
        "RCF4_Omissions",
        "RCF4_Commissions",
        "CLOCK_time",
        "CLOCK_file",
        "CLOCK_Score",
        "TMTA_file",
        "TMTA_time",
        "TMTA_errors",
        "TMTB_file",
        "TMTB_time",
        "TMTB_errors",
        "MELODIES_1",
        "MELODIES_2",
        "MELODIES_3",
        "MELODIES_4",
        "MELODIES_5",
        "MELODIES_6",
        "MELODIES_7",
        "MELODIES_8",
        "MELODIES_9",
        "MELODIES_10",
        "MELODIES_11",
        "MELODIES_12",
        "MELODIES_13",
        "MELODIES_14",
        "MELODIES_15",
        "MELODIES_16",
        "MELODIES_17",
        "MELODIES_18",
        "MELODIES_19",
        "MELODIES_20",
        "MELODIES_21",
        "MELODIES_22",
        "MELODIES_23",
        "MELODIES_24",
        "MELODIES_total",
        "DSFWD1_file",
        "DSFWD1_correct",
        "DSFWD2_file",
        "DSFWD2_correct",
        "DSFWD3_file",
        "DSFWD3_correct",
        "DSFWD4_file",
        "DSFWD4_correct",
        "DSFWD5_file",
        "DSFWD5_correct",
        "DSFWD6_file",
        "DSFWD6_correct",
        "DSFWD7_file",
        "DSFWD7_correct",
        "DSFWD8_file",
        "DSFWD8_correct",
        "DSFWD9_file",
        "DSFWD9_correct",
        "DSFWD10_file",
        "DSFWD10_correct",
        "DSFWD11_file",
        "DSFWD11_correct",
        "DSFWD12_file",
        "DSFWD12_correct",
        "DSFWD13_file",
        "DSFWD13_correct",
        "DSFWD14_file",
        "DSFWD14_correct",
        "DSFWD_totalcorrect",
        "DSFWD_longestseries",
        "DSBWD1_file",
        "DSBWD1_correct",
        "DSBWD2_file",
        "DSBWD2_correct",
        "DSBWD3_file",
        "DSBWD3_correct",
        "DSBWD4_file",
        "DSBWD4_correct",
        "DSBWD5_file",
        "DSBWD5_correct",
        "DSBWD6_file",
        "DSBWD6_correct",
        "DSBWD7_file",
        "DSBWD7_correct",
        "DSBWD8_file",
        "DSBWD8_correct",
        "DSBWD9_file",
        "DSBWD9_correct",
        "DSBWD10_file",
        "DSBWD10_correct",
        "DSBWD11_file",
        "DSBWD11_correct",
        "DSBWD12_file",
        "DSBWD12_correct",
        "DSBWD13_file",
        "DSBWD13_correct",
        "DSBWD14_file",
        "DSBWD14_correct",
        "DSBWD_totalcorrect",
        "DSBWD_longestseries",
        "MATRICES1_answer",
        "MATRICES1_correct",
        "MATRICES2_answer",
        "MATRICES2_correct",
        "MATRICES3_answer",
        "MATRICES3_correct",
        "MATRICES4_answer",
        "MATRICES4_correct",
        "MATRICES5_answer",
        "MATRICES5_correct",
        "MATRICES6_answer",
        "MATRICES6_correct",
        "MATRICES7_answer",
        "MATRICES7_correct",
        "MATRICES8_answer",
        "MATRICES8_correct",
        "MATRICES9_answer",
        "MATRICES9_correct",
        "MATRICES10_answer",
        "MATRICES10_correct",
        "MATRICES11_answer",
        "MATRICES11_correct",
        "MATRICES12_answer",
        "MATRICES12_correct",
        "MATRICES13_answer",
        "MATRICES13_correct",
        "MATRICES14_answer",
        "MATRICES14_correct",
        "MATRICES15_answer",
        "MATRICES15_correct",
        "MATRICES16_answer",
        "MATRICES16_correct",
        "MATRICES17_answer",
        "MATRICES17_correct",
        "MATRICES18_answer",
        "MATRICES18_correct",
        "MATRICES19_answer",
        "MATRICES19_correct",
        "MATRICES20_answer",
        "MATRICES20_correct",
        "MATRICES21_answer",
        "MATRICES21_correct",
        "MATRICES22_answer",
        "MATRICES22_correct",
        "MATRICES23_answer",
        "MATRICES23_correct",
        "MATRICES24_answer",
        "MATRICES24_correct",
        "MATRICES25_answer",
        "MATRICES25_correct",
        "MATRICES26_answer",
        "MATRICES26_correct",
        "MATRICES27_answer",
        "MATRICES27_correct",
        "MATRICES28_answer",
        "MATRICES28_correct",
        "MATRICES29_answer",
        "MATRICES29_correct",
        "MATRICES30_answer",
        "MATRICES30_correct",
        "MATRICES31_answer",
        "MATRICES31_correct",
        "MATRICES32_answer",
        "MATRICES32_correct",
        "MATRICES33_answer",
        "MATRICES33_correct",
        "MATRICES34_answer",
        "MATRICES34_correct",
        "MATRICES35_answer",
        "MATRICES35_correct",
        "MATRICES36_answer",
        "MATRICES36_correct",
        "MATRICES37_answer",
        "MATRICES37_correct",
        "MATRICES38_answer",
        "MATRICES38_correct",
        "MATRICES39_answer",
        "MATRICES39_correct",
        "MATRICES40_answer",
        "MATRICES40_correct",
        "MATRICES41_answer",
        "MATRICES41_correct",
        "MATRICES42_answer",
        "MATRICES42_correct",
        "MATRICES43_answer",
        "MATRICES43_correct",
        "MATRICES44_answer",
        "MATRICES44_correct",
        "MATRICES45_answer",
        "MATRICES45_correct",
        "MATRICES46_answer",
        "MATRICES46_correct",
        "MATRICES47_answer",
        "MATRICES47_correct",
        "MATRICES48_answer",
        "MATRICES48_correct",
        "MATRICES49_answer",
        "MATRICES49_correct",
        "MATRICES50_answer",
        "MATRICES50_correct",
        "MATRICES51_answer",
        "MATRICES51_correct",
        "MATRICES52_answer",
        "MATRICES52_correct",
        "MATRICES53_answer",
        "MATRICES53_correct",
        "MATRICES54_answer",
        "MATRICES54_correct",
        "MATRICES55_answer",
        "MATRICES55_correct",
        "MATRICES56_answer",
        "MATRICES56_correct",
        "MATRICES57_answer",
        "MATRICES57_correct",
        "MATRICES58_answer",
        "MATRICES58_correct",
        "MATRICES59_answer",
        "MATRICES59_correct",
        "MATRICES60_answer",
        "MATRICES60_correct",
        "MATRICES_totalcorrect",
        "STROOP1_file",
        "STROOP1_RT",
        "STROOP1_errors",
        "STROOP1_corrections",
        "STROOP2_file",
        "STROOP2_RT",
        "STROOP2_errors",
        "STROOP2_corrections",
        "STROOP3_file",
        "STROOP3_RT",
        "STROOP3_errors",
        "STROOP3_corrections",
        "STROOP4_file",
        "STROOP4_RT",
        "STROOP4_errors",
        "STROOP4_corrections",
        "MOTOR1_dominant_file",
        "MOTOR1_dominant_score",
        "MOTOR1_nondominant_file",
        "MOTOR1_nondominant_score",
        "MOTOR2_dominant_file",
        "MOTOR2_dominant_score",
        "MOTOR2_nondominant_file",
        "MOTOR2_nondominant_score",
        "MOTOR3_dominant_file",
        "MOTOR3_dominant_score",
        "MOTOR3_nondominant_file",
        "MOTOR3_nondominant_score",
        "EYESPractice_answer",
        "EYESPractice_correct",
        "EYES1_answer",
        "EYES1_correct",
        "EYES2_answer",
        "EYES2_correct",
        "EYES3_answer",
        "EYES3_correct",
        "EYES4_answer",
        "EYES4_correct",
        "EYES5_answer",
        "EYES5_correct",
        "EYES6_answer",
        "EYES6_correct",
        "EYES7_answer",
        "EYES7_correct",
        "EYES8_answer",
        "EYES8_correct",
        "EYES9_answer",
        "EYES9_correct",
        "EYES10_answer",
        "EYES10_correct",
        "EYES11_answer",
        "EYES11_correct",
        "EYES12_answer",
        "EYES12_correct",
        "EYES13_answer",
        "EYES13_correct",
        "EYES14_answer",
        "EYES14_correct",
        "EYES15_answer",
        "EYES15_correct",
        "EYES16_answer",
        "EYES16_correct",
        "EYES17_answer",
        "EYES17_correct",
        "EYES18_answer",
        "EYES18_correct",
        "EYES19_answer",
        "EYES19_correct",
        "EYES20_answer",
        "EYES20_correct",
        "EYES21_answer",
        "EYES21_correct",
        "EYES22_answer",
        "EYES22_correct",
        "EYES23_answer",
        "EYES23_correct",
        "EYES24_answer",
        "EYES24_correct",
        "EYES25_answer",
        "EYES25_correct",
        "EYES26_answer",
        "EYES26_correct",
        "EYES27_answer",
        "EYES27_correct",
        "EYES28_answer",
        "EYES28_correct",
        "EYES29_answer",
        "EYES29_correct",
        "EYES30_answer",
        "EYES30_correct",
        "EYES31_answer",
        "EYES31_correct",
        "EYES32_answer",
        "EYES32_correct",
        "EYES33_answer",
        "EYES33_correct",
        "EYES34_answer",
        "EYES34_correct",
        "EYES35_answer",
        "EYES35_correct",
        "EYES36_answer",
        "EYES36_correct",
        "EYES_total"
    ];

    connection.query('CALL get_participants_id()', function(err, result) {
        if (err) throw err;

        result[0].forEach(function(value) {
            ids.push(value._id);
        });

        // var testID = 'CBA3C5F3-7948-467B-9B';
        // ids = [];
        // ids[0] = testID;
        var participants = [];
        var participant = {};
        var limit = ids.length;

        for (var i = 0; i < limit; i++) {
            async.parallel({
                participant: function (callback) {
                    connection.query('CALL get_participant("' + ids[i] + '")', function (err, result) {
                        if (err) throw err;

                        if (result[0][0].dob != undefined) {
                            result[0][0].age = _calculateAge(result[0][0].dob);
                        }

                        callback(null, result[0][0]);
                    });
                },
                acculturation: function (callback) {
                    connection.query('CALL get_acculturation_by_id("' + ids[i] + '")', function (err, result) {
                        if (err) throw err;

                        callback(null, result[0][0]);
                    });
                },
                cancellation: function (callback) {
                    connection.query('CALL get_cancellation_by_id("' + ids[i] + '")', function (err, result) {
                        if (err) throw err;

                        callback(null, result[0][0]);
                    });
                },
                children: function (callback) {
                    connection.query('CALL get_children_by_id("' + ids[i] + '")', function (err, result) {
                        if (err) throw err;

                        callback(null, result[0]);
                    });
                },
                clockDrawing: function (callback) {
                    connection.query('CALL get_clock_drawing_by_id("' + ids[i] + '")', function (err, result) {
                        if (err) throw err;

                        callback(null, result[0][0]);
                    });
                },
                comprehension: function (callback) {
                    connection.query('CALL get_comprehension_by_id("' + ids[i] + '")', function (err, result) {
                        if (err) throw err;

                        callback(null, result[0][0]);
                    });
                },
                cpt: function (callback) {
                    connection.query('CALL get_cpt_by_id("' + ids[i] + '")', function (err, result) {
                        if (err) throw err;

                        callback(null, result[0][0]);
                    });
                },
                cptHits: function (callback) {
                    connection.query('CALL get_cpt_hits_by_id("' + ids[i] + '")', function (err, result) {
                        if (err) throw err;

                        callback(null, result[0]);
                    });
                },
                culturalValues: function (callback) {
                    connection.query('CALL get_cultural_values_by_id("' + ids[i] + '")', function (err, result) {
                        if (err) throw err;

                        callback(null, result[0][0]);
                    });
                },
                digitsSpan: function (callback) {
                    connection.query('CALL get_digital_span_by_id("' + ids[i] + '")', function (err, result) {
                        if (err) throw err;

                        callback(null, result[0][0]);
                    });
                },
                education: function (callback) {
                    connection.query('CALL get_education_by_id("' + ids[i] + '")', function (err, result) {
                        if (err) throw err;

                        callback(null, result[0][0]);
                    });
                },
                ethnicity: function (callback) {
                    connection.query('CALL get_ethnicity_by_id("' + ids[i] + '")', function (err, result) {
                        if (err) throw err;

                        callback(null, result[0]);
                    });
                },
                eyes: function (callback) {
                    connection.query('CALL get_eyes_by_id("' + ids[i] + '")', function (err, result) {
                        if (err) throw err;

                        callback(null, result[0][0]);
                    });
                },
                genderRoles: function (callback) {
                    connection.query('CALL get_gender_roles_by_id("' + ids[i] + '")', function (err, result) {
                        if (err) throw err;

                        callback(null, result[0][0]);
                    });
                },
                handDominates: function (callback) {
                    connection.query('CALL get_hand_dominates_by_id("' + ids[i] + '")', function (err, result) {
                        if (err) throw err;

                        callback(null, result[0][0]);
                    });
                },
                immigrants: function (callback) {
                    connection.query('CALL get_immigrants_by_id("' + ids[i] + '")', function (err, result) {
                        if (err) throw err;

                        callback(null, result[0][0]);
                    });
                },
                income: function (callback) {
                    connection.query('CALL get_income_by_id("' + ids[i] + '")', function (err, result) {
                        if (err) throw err;

                        callback(null, result[0][0]);
                    });
                },
                maritalStatus: function (callback) {
                    connection.query('CALL get_marital_status_by_id("' + ids[i] + '")', function (err, result) {
                        if (err) throw err;

                        callback(null, result[0][0]);
                    });
                },
                matrices: function (callback) {
                    connection.query('CALL get_matrices_by_id("' + ids[i] + '")', function (err, result) {
                        if (err) throw err;

                        callback(null, result[0][0]);
                    });
                },
                mocammse: function (callback) {
                    connection.query('CALL get_mocammse_by_id("' + ids[i] + '")', function (err, result) {
                        if (err) throw err;

                        callback(null, result[0][0]);
                    });
                },
                motorTask: function (callback) {
                    connection.query('CALL get_motor_task_by_id("' + ids[i] + '")', function (err, result) {
                        if (err) throw err;

                        callback(null, result[0][0]);
                    });
                },
                namingTask: function (callback) {
                    connection.query('CALL get_naming_task_by_id("' + ids[i] + '")', function (err, result) {
                        if (err) throw err;

                        callback(null, result[0][0]);
                    });
                },
                occupation: function (callback) {
                    connection.query('CALL get_occupation_by_id("' + ids[i] + '")', function (err, result) {
                        if (err) throw err;

                        callback(null, result[0][0]);
                    });
                },
                pitch: function (callback) {
                    connection.query('CALL get_pitch_by_id("' + ids[i] + '")', function (err, result) {
                        if (err) throw err;

                        callback(null, result[0][0]);
                    });
                },
                psychologicalTest: function (callback) {
                    connection.query('CALL get_psychological_test_by_id("' + ids[i] + '")', function (err, result) {
                        if (err) throw err;

                        callback(null, result[0][0]);
                    });
                },
                race: function (callback) {
                    connection.query('CALL get_race_by_id("' + ids[i] + '")', function (err, result) {
                        if (err) throw err;

                        callback(null, result[0][0]);
                    });
                },
                religion: function (callback) {
                    connection.query('CALL get_religion_by_id("' + ids[i] + '")', function (err, result) {
                        if (err) throw err;

                        callback(null, result[0][0]);
                    });
                },
                residence: function (callback) {
                    connection.query('CALL get_residence_by_id("' + ids[i] + '")', function (err, result) {
                        if (err) throw err;

                        callback(null, result[0][0]);
                    });
                },
                reyComplexFigure: function (callback) {
                    connection.query('CALL get_rey_complex_figure_by_id("' + ids[i] + '")', function (err, result) {
                        if (err) throw err;

                        callback(null, result[0]);
                    });
                },
                reyComplexFigure4: function (callback) {
                    connection.query('CALL get_rey_complex_figure_4_by_id("' + ids[i] + '")', function (err, result) {
                        if (err) throw err;

                        callback(null, result[0][0]);
                    });
                },
                socialStatus: function (callback) {
                    connection.query('CALL get_social_status_by_id("' + ids[i] + '")', function (err, result) {
                        if (err) throw err;

                        callback(null, result[0][0]);
                    });
                },
                socialSupport: function (callback) {
                    connection.query('CALL get_social_support_by_id("' + ids[i] + '")', function (err, result) {
                        if (err) throw err;

                        callback(null, result[0][0]);
                    });
                },
                stroop: function (callback) {
                    connection.query('CALL get_stroop_by_id("' + ids[i] + '")', function (err, result) {
                        if (err) throw err;

                        callback(null, result[0][0]);
                    });
                },
                trailMaking: function (callback) {
                    connection.query('CALL get_trail_making_by_id("' + ids[i] + '")', function (err, result) {
                        if (err) throw err;

                        callback(null, result[0][0]);
                    });
                },
                wordlist: function (callback) {
                    connection.query('CALL get_wordlist_by_id("' + ids[i] + '")', function (err, result) {
                        if (err) throw err;

                        callback(null, result[0][0]);
                    });
                },
                wordlist2: function (callback) {
                    connection.query('CALL get_wordlist_2_by_id("' + ids[i] + '")', function (err, result) {
                        if (err) throw err;

                        callback(null, result[0][0]);
                    });
                }
            }, function (err, results) {
                if (err) return console.log(err);

                participants.push(results);

                if (0 === --limit) {
                    var users = [];

                    for (var i = 0; i < participants.length; i++) {
                        users.push(createUser(participants[i]));
                    }

                    var json2csvCallback = function (err, csv) {
                        if (err) throw err;
                        // console.log(csv);
                        res.set('Content-Type', 'text/csv');
                        res.send(csv);
                    };

                    converter.json2csv(users, json2csvCallback);


                }

            });
        }
    });
});

function createUser(data) {
    var user = {};

    user._id = data.participant._id;
    user.DOB = data.participant.dob;

    if (data.participant.gender == 'm') {
        user.GENDER = 1;
    } else if (data.participant.gender == 'f') {
        user.GENDER = 2;
    } else if (data.participant.gender == 'o') {
        user.GENDER = 3;
    }

    var date = new Date(data.participant.timestamp);

    user.REAL_date = date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
    user.REAL_time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    user.REAL_AMPM = date.getHours() < 12 ? "AM" : "PM";
    user.REAL_dayOfWeek = data.participant.dayOfWeek;
    user.REAL_country = data.participant.country;
    user.REAL_county = data.participant.county;
    user.REAL_city = data.participant.city;
    user.REAL_location = data.participant.location;
    user.REAL_floor = data.participant.floor;

    csvQuestionnnaire(user, data);

    // MoCA/MMSE
    csvMoCAMMSE(user, data);

    // RCF
    csvRCF(user, data);
    csvRCF4(user, data);

    // Clock Drawing Test
    csvClockDrawing(user, data);

    // Trail Making Test
    csvTrailMaking(user, data);

    // Pitch Recognition
    csvPitchRecognition(user, data);

    // Digits Span
    csvDigitsSpan(user, data);

    // Matrices
    csvMatrices(user, data);

    // CPT
    csvCPT(user, data);

    // Motor Task
    csvMotor(user, data);

    // Words List
    csvWordList(user, data);
    csvWordList2(user, data);

    // Stroop
    csvStroop(user, data);

    // Cancellation Task
    csvCancellation(user, data);

    // Naming Task
    csvNaming(user, data);

    // Comprehension Task
    csvComprehension(user, data);

    // Eyes Test
    csvEyes(user, data);

    return user;
}

function csvQuestionnnaire(user, data) {
    user.WRITINGHAND = null;
    user.DRAWINGHAND = null;
    user.THROWINGHAND = null;
    user.SCISSORSHAND = null;
    user.TOOTHBRUSHHAND = null;
    user.KNIFEHAND = null;
    user.SPOONHAND = null;
    user.BROOMHAND = null;
    user.MATCHHAND = null;
    user.OPENINGHAND = null;
    user.RACE = null;
    user.ETHNICITY1 = null;
    user.ETHNICITY2 = null;
    user.ETHNICITY3 = null;
    user.ETHNICITY4 = null;
    user.ETHNICITY5 = null;
    user.MSTATUS = null;
    user.MARRIED_YEARS = null;
    user.MARRIED_MONTHS = null;
    user.PARTNER_YEARS = null;
    user.PARTNER_MONTHS = null;
    user.WIDOW_YEARS = null;
    user.WIDOW_MONTHS = null;
    user.SEPARATED_YEARS = null;
    user.SEPARATED_MONTHS = null;
    user.CHILDREN = null;
    user.CHILDREN_NUMBER = null;
    user.CHILD1_AGE = null;
    user.CHILD1_GENDER = null;
    user.CHILD2_AGE = null;
    user.CHILD2_GENDER = null;
    user.CHILD3_AGE = null;
    user.CHILD3_GENDER = null;
    user.CHILD4_AGE = null;
    user.CHILD4_GENDER = null;
    user.CHILD5_AGE = null;
    user.CHILD5_GENDER = null;
    user.CHILD6_AGE = null;
    user.CHILD6_GENDER = null;
    user.CHILD7_AGE = null;
    user.CHILD7_GENDER = null;
    user.CHILD8_AGE = null;
    user.CHILD8_GENDER = null;
   user.RESIDENCECITY = null;
   user.RESIDENCESTATE = null;
   user.RESIDENCECOUNTRY = null;
   user.RESIDENCEINHABITANTS = null;
   user.RESIDENCEURBANICITY = null;
   user.DAILY_ACTIVITIES = null;
   user.DAILY_ACTIVITIES_SPECIFY = null;
   user.UNEMPLOYED_YEARS = null;
   user.UNEMPLOYED_MONTHS = null;
   user.JOB_TYPE = null;
   user.CURRENT_POSITION = null;
   user.CURRENT_POSITION_DESC = null;
   user.OTHER_CURRENT_POSITION_DESC = null;
   user.CONDITION_DESC = null;
   user.PARTICIPATE_DESCISIONS = null;
   user.SUPERVISE_OTHERS = null;
   user.FINANCIALLY_DEPENDENT = null;
   user.EARNINGS = null;
   user.PEOPLE_IN_HOUSEHOLD = null;
   user.CHILDREN_IN_HOUSEHOLD = null;
   user.ADULTS_IN_HOUSEHOLD = null;
   user.ADULTS_INCOME_IN_HOUSEHOLD = null;
   user.HOME_STATUS = null;
   user.OTHER_HOME_STATUS = null;
   user.TOTAL_INCOME = null;
   user.COMMUNITYLADDER = null;
   user.COUNTRYLADDER = null;
   user.YEARS_STUDY = null;
   user.AGE_STUDY = null;
   user.HIGHEST_GRADE = null;
   user.HIGHEST_DEGREE = null;
   user.OTHER_HIGHEST_DEGREE = null;
   user.COMPUTER_USAGE = null;
   user.INTERNET_USAGE = null;
   user.BELIEFS = null;
   user.RELIGION = null;
   user.OTHER_RELIGION = null;
   user.PRACTICE_MONTH = null;
   user.HOUSEKEEPING_AS_CHILD_ME = null;
   user.HOUSEKEEPING_AS_CHILD_MOTHER = null;
   user.HOUSEKEEPING_AS_CHILD_FATHER = null;
   user.HOUSEKEEPING_AS_CHILD_PARTNER = null;
   user.HOUSEKEEPING_AS_CHILD_GRANDMOTHER = null;
   user.HOUSEKEEPING_AS_CHILD_GRANDFATHER = null;
   user.HOUSEKEEPING_AS_CHILD_AUNT = null;
   user.HOUSEKEEPING_AS_CHILD_UNCLE = null;
   user.HOUSEKEEPING_AS_CHILD_SISTER = null;
   user.HOUSEKEEPING_AS_CHILD_BROTHER = null;
   user.HOUSEKEEPING_AS_CHILD_MALE_COUSIN = null;
   user.HOUSEKEEPING_AS_CHILD_FEMALE_COUSIN = null;
   user.HOUSEKEEPING_AS_CURRENT_ME = null;
   user.HOUSEKEEP_AS_CURRENT_MOTHER = null;
   user.HOUSEKEEP_AS_CURRENT_FATHER = null;
   user.HOUSEKEEP_AS_CURRENT_PARTNER = null;
   user.HOUSEKEEP_AS_CURRENT_GRANDMOTHER = null;
   user.HOUSEKEEP_AS_CURRENT_GRANDFATHER = null;
   user.HOUSEKEEP_AS_CURRENT_AUNT = null;
   user.HOUSEKEEP_AS_CURRENT_UNCLE = null;
   user.HOUSEKEEP_AS_CURRENT_SISTER = null;
   user.HOUSEKEEP_AS_CURRENT_BROTHER = null;
   user.HOUSEKEEP_AS_CURRENT_MALE_COUSIN = null;
   user.HOUSEKEEP_AS_CURRENT_FEMALE_COUSIN = null;
   user.CARETAKER_AS_CHILD_ME = null;
   user.CARETAKER_AS_CHILD_MOTHER = null;
   user.CARETAKER_AS_CHILD_FATHER = null;
   user.CARETAKER_AS_CHILD_PARTNER = null;
   user.CARETAKER_AS_CHILD_GRANDMOTHER = null;
   user.CARETAKER_AS_CHILD_GRANDFATHER = null;
   user.CARETAKER_AS_CHILD_AUNT = null;
   user.CARETAKER_AS_CHILD_UNCLE = null;
   user.CARETAKER_AS_CHILD_SISTER = null;
   user.CARETAKER_AS_CHILD_BROTHER = null;
   user.CARETAKER_AS_CHILD_MALE_COUSIN = null;
   user.CARETAKER_AS_CHILD_FEMALE_COUSIN = null;
   user.CARETAKER_ME = null;
   user.CARETAKER_MOTHER = null;
   user.CARETAKER_FATHER = null;
   user.CARETAKER_PARTNER = null;
   user.CARETAKER_GRANDMOTHER = null;
   user.CARETAKER_GRANDFATHER = null;
   user.CARETAKER_AUNT = null;
   user.CARETAKER_UNCLE = null;
   user.CARETAKER_SISTER = null;
   user.CARETAKER_BROTHER = null;
   user.CARETAKER_MALE_COUSIN = null;
   user.CARETAKER_FEMALE_COUSIN = null;
   user.CHILD_UPBRINGING_ME = null;
   user.CHILD_UPBRINGING_MOTHER = null;
   user.CHILD_UPBRINGING_FATHER = null;
   user.CHILD_UPBRINGING_PARTNER = null;
   user.CHILD_UPBRINGING_GRANDMOTHER = null;
   user.CHILD_UPBRINGING_GRANDFATHER = null;
   user.CHILD_UPBRINGING_AUNT = null;
   user.CHILD_UPBRINGING_UNCLE = null;
   user.CHILD_UPBRINGING_SISTER = null;
   user.CHILD_UPBRINGING_BROTHER = null;
   user.CHILD_UPBRINGING_MALE_COUSIN = null;
   user.CHILD_UPBRINGING_FEMALE_COUSIN = null;
   user.IMPORTANT_DECISIONS_CURRENT_ME = null;
   user.IMPORTANT_DECISIONS_CURRENT_MOTHER = null;
   user.IMPORTANT_DECISIONS_CURRENT_FATHER = null;
   user.IMPORTANT_DECISIONS_CURRENT_PARTNER = null;
   user.IMPORTANT_DECISIONS_CURRENT_GRANDMOTHER = null;
   user.IMPORTANT_DECISIONS_CURRENT_GRANDFATHER = null;
   user.IMPORTANT_DECISIONS_CURRENT_AUNT = null;
   user.IMPORTANT_DECISIONS_CURRENT_UNCLE = null;
   user.IMPORTANT_DECISIONS_CURRENT_SISTER = null;
   user.IMPORTANT_DECISIONS_CURRENT_BROTHER = null;
   user.IMPORTANT_DECISIONS_CURRENT_MALE_COUSIN = null;
   user.IMPORTANT_DECISIONS_CURRENT_FEMALE_COUSIN = null;
   user.PERSONAL_SPACE = null;
   user.CAPABILITIES = null;
   user.UNIQUE = null;
   user.LAW_OF_NATURE = null;
   user.COMPETITION = null;
   user.SACRIFICE_ACTIVITY = null;
   user.DETEST = null;
   user.SACRIFICE_INTEREST = null;
   user.FAST_TASK = null;
   user.SLOW_TASK = null;
   user.COUNT_ON = null;
   user.COUNT_ON_FRIEND = null;
   user.COUNT_ON_PARTNER = null;
   user.COUNT_ON_RELATIVE = null;
   user.RELY_ON = null;
   user.RELIES_ON_FRIEND = null;
   user.RELIES_ON_PARTNER = null;
   user.RELIES_ON_RELATIVE = null;
   user.ENJOY_ON = null;
   user.ENJOY_SAME_FRIEND = null;
   user.ENJOY_SAME_PARTNER = null;
   user.ENJOY_SAME_RELATIVE = null;
   user.NO_HELP = null;
   user.EMOTIONAL_ON = null;
   user.EMOTIONAL_LINK_FRIEND = null;
   user.EMOTIONAL_LINK_PARTNER = null;
   user.EMOTIONAL_LINK_RELATIVE = null;
   user.COMFORTABLE = null;
   user.ADMINISTERED_PSYCHOLOGICAL_TEST = null;
   user.TIMED_PSYCHOLOGICAL_TEST = null;
   user.COMFORTABLE_PSYCHOLOGICAL_TEST = null;
   user.IMMIGRANT_USABORN = null;
   user.IMMIGRANT_GENERATION = null;
   user.IMMIGRANT_BORN = null;
   user.IMMIGRANT_TOWN_SIZE = null;
   user.IMMIGRANT_URBANICITY = null;
   user.IMMIGRANT_NATIONALITY = null;
   user.IMMIGRANTS_MOVE_YEARS = null;
   user.IMMIGRANTS_MOVE_MONTHS = null;
   user.IMMIGRANT_DAILY_ACTIVITIES = null;
   user.IMMIGRANT_DAILY_ACTIVITIES_SPECIFY = null;
   user.IMMIGRANT_JOB_TYPE = null;
   user.IMMIGRANT_FORMER_POSITION = null;
   user.IMMIGRANT_FORMER_POSITION_DESC = null;
   user.IMMIGRANT_CONDITION_DESC = null;
   user.IMMIGRANT_PARTICIPATE_DESCISIONS = null;
   user.IMMIGRANT_SUPERVISE_OTHERS = null;
   user.MYSELFBEINGAMERICAN = null;
   user.FEELINGGOODAMERICAN = null;
   user.AMERICANIMPORTANT = null;
   user.FEELAMERICANCULTURE = null;
   user.STRONGBEINGAMERICAN = null;
   user.PROUDAMERICAN = null;
   user.MYCULTUREBEING = null;
   user.MYCULTUREBEINGGOOD = null;
   user.MYCULTUREIMPORTINLIFE = null;
   user.PARTOFCULTURE = null;
   user.BEINGOFCULTURE = null;
   user.BEINGOFCULTUREPROUD = null;
   user.ENGLISHSCHOOL = null;
   user.ENGLISHFRIENDS = null;
   user.ENGLISHPHONE = null;
   user.ENGLISHSTRANGER = null;
   user.ENGLISHGENERAL = null;
   user.ENGLISHTV = null;
   user.ENGLISHNEWSPAPER = null;
   user.ENGLISHSONGS = null;
   user.ENGLISHUGENERAL = null;
   user.NATIVEFAMILY = null;
   user.NATIVEFRIENDS = null;
   user.NATIVEPHONE = null;
   user.NATIVESTRANGERS = null;
   user.NATIVEGENERAL = null;
   user.NATIVETV = null;
   user.NATIVENEWSPAPER = null;
   user.NATIVESONGS = null;
   user.NATIVEUGENERAL = null;
   user.KNOWAMERICANHEROES = null;
   user.KNOWAMERICANTV = null;
   user.KNOWAMERICANNEWSPAPER = null;
   user.KNOWAMERICANACTOR = null;
   user.KNOWAMERICANHISTORY = null;
   user.KNOWAMERICANLEADER = null;
   user.KNOWNATIVEHEROES = null;
   user.KNOWNATIVETV = null;
   user.KNOWNATIVENEWSPAPER = null;
   user.KNOWNATIVEACTOR = null;
   user.KNOWNATIVEHISTORY = null;
   user.KNOWNATIVELEADER = null;

   if (data.handDominates != undefined) {
       if (data.handDominates.writing == '1') {
           user.WRITINGHAND = 1;
       } else if (data.handDominates.writing == 'r') {
           user.WRITINGHAND = 2;
       }

       if (data.handDominates.drawing == '1') {
           user.DRAWINGHAND = 1;
       } else if (data.handDominates.drawing == 'r') {
           user.DRAWINGHAND = 2;
       }

       if (data.handDominates.ball_throw == '1') {
           user.THROWINGHAND = 1;
       } else if (data.handDominates.ball_throw == 'r') {
           user.THROWINGHAND = 2;
       }

       if (data.handDominates.scissors == '1') {
           user.SCISSORSHAND = 1;
       } else if (data.handDominates.scissors == 'r') {
           user.SCISSORSHAND = 2;
       }

       if (data.handDominates.toothbrush == '1') {
           user.TOOTHBRUSHHAND = 1;
       } else if (data.handDominates.toothbrush == 'r') {
           user.TOOTHBRUSHHAND = 2;
       }

       if (data.handDominates.knife == '1') {
           user.KNIFEHAND = 1;
       } else if (data.handDominates.knife == 'r') {
           user.KNIFEHAND = 2;
       }

       if (data.handDominates.spoon == '1') {
           user.SPOONHAND = 1;
       } else if (data.handDominates.spoon == 'r') {
           user.SPOONHAND = 2;
       }
       if (data.handDominates.broom == '1') {
           user.BROOMHAND = 1;
       } else if (data.handDominates.broom == 'r') {
           user.BROOMHAND = 2;
       }
       if (data.handDominates.match == '1') {
           user.MATCHHAND = 1;
       } else if (data.handDominates.match == 'r') {
           user.MATCHHAND = 2;
       }
       if (data.handDominates.lid == '1') {
           user.OPENINGHAND = 1;
       } else if (data.handDominates.lid == 'r') {
           user.OPENINGHAND = 2;
       }
   }
   if (data.race != undefined) {
       user.RACE = data.race.race;
   }
   if (data.ethnicity != undefined) {
       switch (data.ethnicity.length) {
           case 5:
               user.ETHNICITY5 = data.ethnicity[4].ethnicity;
           case 4:
               user.ETHNICITY4 = data.ethnicity[3].ethnicity;
           case 3:
               user.ETHNICITY3 = data.ethnicity[2].ethnicity;
           case 2:
               user.ETHNICITY2 = data.ethnicity[1].ethnicity;
           case 1:
               user.ETHNICITY1 = data.ethnicity[0].ethnicity;
               break;
       }

   }
   if (data.maritalStatus != undefined) {
       user.MSTATUS = data.maritalStatus.status;
       user.MARRIED_YEARS = data.maritalStatus.marriedYears;
       user.MARRIED_MONTHS = data.maritalStatus.marriedMonths;
       user.PARTNER_YEARS = data.maritalStatus.partnerYears;
       user.PARTNER_MONTHS = data.maritalStatus.partnerMonths;
       user.WIDOW_YEARS = data.maritalStatus.widowYears;
       user.WIDOW_MONTHS = data.maritalStatus.widowMonths;
       user.SEPARATED_YEARS = data.maritalStatus.separatedYears;
       user.SEPARATED_MONTHS = data.maritalStatus.separatedMonths;
       user.CHILDREN = data.children.length > 0 ? 1 : 2;
       user.CHILDREN_NUMBER = data.children.length;

       switch (data.children.length) {
           case 8:
               user.CHILD8_AGE = data.children[7].age;
               if (data.children[7].gender == 'm') {
                   user.CHILD8_GENDER = 1;
               } else if (data.children[7].gender == 'f') {
                   user.CHILD8_GENDER = 2;
               }
           case 7:
               user.CHILD7_AGE = data.children[6].age;
               if (data.children[6].gender == 'm') {
                   user.CHILD7_GENDER = 1;
               } else if (data.children[6].gender == 'f') {
                   user.CHILD7_GENDER = 2;
               }
           case 6:
               user.CHILD6_AGE = data.children[5].age;
               if (data.children[5].gender == 'm') {
                   user.CHILD6_GENDER = 1;
               } else if (data.children[5].gender == 'f') {
                   user.CHILD6_GENDER = 2;
               }
           case 5:
               user.CHILD5_AGE = data.children[4].age;
               if (data.children[4].gender == 'm') {
                   user.CHILD5_GENDER = 1;
               } else if (data.children[4].gender == 'f') {
                   user.CHILD5_GENDER = 2;
               }
           case 4:
               user.CHILD4_AGE = data.children[3].age;
               if (data.children[3].gender == 'm') {
                   user.CHILD4_GENDER = 1;
               } else if (data.children[3].gender == 'f') {
                   user.CHILD4_GENDER = 2;
               }
           case 3:
               user.CHILD3_AGE = data.children[2].age;
               if (data.children[2].gender == 'm') {
                   user.CHILD3_GENDER = 1;
               } else if (data.children[2].gender == 'f') {
                   user.CHILD3_GENDER = 2;
               }
           case 2:
               user.CHILD2_AGE = data.children[1].age;
               if (data.children[1].gender == 'm') {
                   user.CHILD2_GENDER = 1;
               } else if (data.children[1].gender == 'f') {
                   user.CHILD2_GENDER = 2;
               }
           case 1:
               user.CHILD1_AGE = data.children[0].age;
               if (data.children[0].gender == 'm') {
                   user.CHILD1_GENDER = 1;
               } else if (data.children[0].gender == 'f') {
                   user.CHILD1_GENDER = 2;
               }
               break;
       }
   }
   if (data.residence != undefined) {
       user.RESIDENCECITY = data.residence.city;
       user.RESIDENCESTATE = data.residence.state;
       user.RESIDENCECOUNTRY = data.residence.country;
       user.RESIDENCEINHABITANTS = data.residence.inhabitants;
       user.RESIDENCEURBANICITY = data.residence.geography;
   }
   if (data.occupation != undefined) {
       user.DAILY_ACTIVITIES = data.occupation.daily_activities;
       user.DAILY_ACTIVITIES_SPECIFY = data.occupation.daily_activities_specify;
       user.UNEMPLOYED_YEARS = data.occupation.unemployedY;
       user.UNEMPLOYED_MONTHS = data.occupation.unemployedM;
       user.JOB_TYPE = data.occupation.job_type;
       user.CURRENT_POSITION = data.occupation.current_position;
       user.CURRENT_POSITION_DESC = data.occupation.current_position_desc;
       user.CONDITION_DESC = data.occupation.condition_desc;
       user.OTHER_CURRENT_POSITION_DESC = data.occupation.other_current_position_desc;
       user.PARTICIPATE_DESCISIONS = data.occupation.participate_descisions;
       user.SUPERVISE_OTHERS = data.occupation.supervise_others;
   }
   if (data.income != undefined) {
       user.FINANCIALLY_DEPENDENT = data.income.financially_dependent;
       user.EARNINGS = data.income.earnings;
       user.PEOPLE_IN_HOUSEHOLD = data.income.people_in_household;
       user.CHILDREN_IN_HOUSEHOLD = data.income.children_in_household;
       user.ADULTS_IN_HOUSEHOLD = data.income.adults_in_household;
       user.ADULTS_INCOME_IN_HOUSEHOLD = data.income.adults_income_in_household;
       user.HOME_STATUS = data.income.home_status;
       user.OTHER_HOME_STATUS = data.income.other_home_status;
       user.TOTAL_INCOME = data.income.total_income;
   }
   if (data.socialStatus != undefined) {
       user.COMMUNITYLADDER = data.socialStatus.communityLadder;
       user.COUNTRYLADDER = data.socialStatus.countryLadder;
   }
   if (data.education != undefined) {
       user.YEARS_STUDY = data.education.years_study;
       user.AGE_STUDY = data.education.age_study;
       user.HIGHEST_GRADE = data.education.highest_grade;
       user.HIGHEST_DEGREE = data.education.highest_degree;
       user.OTHER_HIGHEST_DEGREE = data.education.other_highest_degree;
       user.COMPUTER_USAGE = data.education.computer_usage;
       user.INTERNET_USAGE = data.education.internet_usage;
   }
   if (data.religion != undefined) {
       user.BELIEFS = data.religion.beliefs;
       user.RELIGION = data.religion.religion;
       user.OTHER_RELIGION = data.religion.other_religion;
       user.PRACTICE_MONTH = data.religion.practice_month;
   }
   if (data.genderRoles != undefined) {
       switch (data.genderRoles.housekeeping_as_child) {
           case "me":
               user.HOUSEKEEPING_AS_CHILD_ME = "yes";
               break;
           case "mother":
               user.HOUSEKEEPING_AS_CHILD_MOTHER = "yes";
               break;
           case "father":
               user.HOUSEKEEPING_AS_CHILD_FATHER = "yes";
               break;
           case "partner":
               user.HOUSEKEEPING_AS_CHILD_PARTNER = "yes";
               break;
           case "grandmother":
               user.HOUSEKEEPING_AS_CHILD_GRANDMOTHER = "yes";
               break;
           case "grandfather":
               user.HOUSEKEEPING_AS_CHILD_GRANDFATHER = "yes";
               break;
           case "aunt":
               user.HOUSEKEEPING_AS_CHILD_AUNT = "yes";
               break;
           case "uncle":
               user.HOUSEKEEPING_AS_CHILD_UNCLE = "yes";
               break;
           case "sister":
               user.HOUSEKEEPING_AS_CHILD_SISTER = "yes";
               break;
           case "brother":
               user.HOUSEKEEPING_AS_CHILD_BROTHER = "yes";
               break;
           case "male_cousin":
               user.HOUSEKEEPING_AS_CHILD_MALE_COUSIN = "yes";
               break;
           case "female_cousin":
               user.HOUSEKEEPING_AS_CHILD_FEMALE_COUSIN = "yes";
               break;
       }

       switch (data.genderRoles.housekeeping_as_current) {
           case "me":
               user.HOUSEKEEPING_AS_CURRENT_ME = "yes";
               break;
           case "mother":
               user.HOUSEKEEP_AS_CURRENT_MOTHER = "yes";
               break;
           case "father":
               user.HOUSEKEEP_AS_CURRENT_FATHER = "yes";
               break;
           case "partner":
               user.HOUSEKEEP_AS_CURRENT_PARTNER = "yes";
               break;
           case "grandmother":
               user.HOUSEKEEP_AS_CURRENT_GRANDMOTHER = "yes";
               break;
           case "grandfather":
               user.HOUSEKEEP_AS_CURRENT_GRANDFATHER = "yes";
               break;
           case "aunt":
               user.HOUSEKEEP_AS_CURRENT_AUNT = "yes";
               break;
           case "uncle":
               user.HOUSEKEEP_AS_CURRENT_UNCLE = "yes";
               break;
           case "sister":
               user.HOUSEKEEP_AS_CURRENT_SISTER = "yes";
               break;
           case "brother":
               user.HOUSEKEEP_AS_CURRENT_BROTHER = "yes";
               break;
           case "male_cousin":
               user.HOUSEKEEP_AS_CURRENT_MALE_COUSIN = "yes";
               break;
           case "female_cousin":
               user.HOUSEKEEP_AS_CURRENT_FEMALE_COUSIN = "yes";
               break;
       }

       switch (data.genderRoles.caretaker_as_child) {
           case "me":
               user.CARETAKER_AS_CHILD_ME = "yes";
               break;
           case "mother":
               user.CARETAKER_AS_CHILD_MOTHER = "yes";
               break;
           case "father":
               user.CARETAKER_AS_CHILD_FATHER = "yes";
               break;
           case "partner":
               user.CARETAKER_AS_CHILD_PARTNER = "yes";
               break;
           case "grandmother":
               user.CARETAKER_AS_CHILD_GRANDMOTHER = "yes";
               break;
           case "grandfather":
               user.CARETAKER_AS_CHILD_GRANDFATHER = "yes";
               break;
           case "aunt":
               user.CARETAKER_AS_CHILD_AUNT = "yes";
               break;
           case "uncle":
               user.CARETAKER_AS_CHILD_UNCLE = "yes";
               break;
           case "sister":
               user.CARETAKER_AS_CHILD_SISTER = "yes";
               break;
           case "brother":
               user.CARETAKER_AS_CHILD_BROTHER = "yes";
               break;
           case "male_cousin":
               user.CARETAKER_AS_CHILD_MALE_COUSIN = "yes";
               break;
           case "female_cousin":
               user.CARETAKER_AS_CHILD_FEMALE_COUSIN = "yes";
               break;
       }

       switch (data.genderRoles.caretaker) {
           case "me":
               user.CARETAKER_ME = "yes";
               break;
           case "mother":
               user.CARETAKER_MOTHER = "yes";
               break;
           case "father":
               user.CARETAKER_FATHER = "yes";
               break;
           case "partner":
               user.CARETAKER_PARTNER = "yes";
               break;
           case "grandmother":
               user.CARETAKER_GRANDMOTHER = "yes";
               break;
           case "grandfather":
               user.CARETAKER_GRANDFATHER = "yes";
               break;
           case "aunt":
               user.CARETAKER_AUNT = "yes";
               break;
           case "uncle":
               user.CARETAKER_UNCLE = "yes";
               break;
           case "sister":
               user.CARETAKER_SISTER = "yes";
               break;
           case "brother":
               user.CARETAKER_BROTHER = "yes";
               break;
           case "male_cousin":
               user.CARETAKER_MALE_COUSIN = "yes";
               break;
           case "female_cousin":
               user.CARETAKER_FEMALE_COUSIN = "yes";
               break;
       }

       switch (data.genderRoles.child_upbringing) {
           case "me":
               user.CHILD_UPBRINGING_ME = "yes";
               break;
           case "mother":
               user.CHILD_UPBRINGING_MOTHER = "yes";
               break;
           case "father":
               user.CHILD_UPBRINGING_FATHER = "yes";
               break;
           case "partner":
               user.CHILD_UPBRINGING_PARTNER = "yes";
               break;
           case "grandmother":
               user.CHILD_UPBRINGING_GRANDMOTHER = "yes";
               break;
           case "grandfather":
               user.CHILD_UPBRINGING_GRANDFATHER = "yes";
               break;
           case "aunt":
               user.CHILD_UPBRINGING_AUNT = "yes";
               break;
           case "uncle":
               user.CHILD_UPBRINGING_UNCLE = "yes";
               break;
           case "sister":
               user.CHILD_UPBRINGING_SISTER = "yes";
               break;
           case "brother":
               user.CHILD_UPBRINGING_BROTHER = "yes";
               break;
           case "male_cousin":
               user.CHILD_UPBRINGING_MALE_COUSIN = "yes";
               break;
           case "female_cousin":
               user.CHILD_UPBRINGING_FEMALE_COUSIN = "yes";
               break;
       }

       switch (data.genderRoles.important_decisions_current) {
           case "me":
               user.IMPORTANT_DECISIONS_CURRENT_ME = "yes";
               break;
           case "mother":
               user.IMPORTANT_DECISIONS_CURRENT_MOTHER = "yes";
               break;
           case "father":
               user.IMPORTANT_DECISIONS_CURRENT_FATHER = "yes";
               break;
           case "partner":
               user.IMPORTANT_DECISIONS_CURRENT_PARTNER = "yes";
               break;
           case "grandmother":
               user.IMPORTANT_DECISIONS_CURRENT_GRANDMOTHER = "yes";
               break;
           case "grandfather":
               user.IMPORTANT_DECISIONS_CURRENT_GRANDFATHER = "yes";
               break;
           case "aunt":
               user.IMPORTANT_DECISIONS_CURRENT_AUNT = "yes";
               break;
           case "uncle":
               user.IMPORTANT_DECISIONS_CURRENT_UNCLE = "yes";
               break;
           case "sister":
               user.IMPORTANT_DECISIONS_CURRENT_SISTER = "yes";
               break;
           case "brother":
               user.IMPORTANT_DECISIONS_CURRENT_BROTHER = "yes";
               break;
           case "male_cousin":
               user.IMPORTANT_DECISIONS_CURRENT_MALE_COUSIN = "yes";
               break;
           case "female_cousin":
               user.IMPORTANT_DECISIONS_CURRENT_FEMALE_COUSIN = "yes";
               break;
       }
   }
   if (data.culturalValues != undefined) {
       user.PERSONAL_SPACE = data.culturalValues.personal_space;
       user.CAPABILITIES = data.culturalValues.capabilities;
       user.UNIQUE = data.culturalValues.unique;
       user.LAW_OF_NATURE = data.culturalValues.law_of_nature;
       user.COMPETITION = data.culturalValues.competition;
       user.SACRIFICE_ACTIVITY = data.culturalValues.sacrifice_activity;
       user.DETEST = data.culturalValues.detest;
       user.SACRIFICE_INTEREST = data.culturalValues.sacrifice_interest;
       user.FAST_TASK = data.culturalValues.fast_task;
       user.SLOW_TASK = data.culturalValues.slow_task;
   }
   if (data.socialSupport != undefined) {
       user.COUNT_ON = data.socialSupport.count_on;
       user.COUNT_ON_FRIEND = data.socialSupport.count_on_who.includes("friend") ? "yes" : null;
       user.COUNT_ON_PARTNER = data.socialSupport.count_on_who.includes("partner") ? "yes" : null;
       user.COUNT_ON_RELATIVE = data.socialSupport.count_on_who.includes("relative") ? "yes" : null;
       user.RELY_ON = data.socialSupport.rely_on;
       user.RELIES_ON_FRIEND = data.socialSupport.relies_on.includes("friend") ? "yes" : null;
       user.RELIES_ON_PARTNER = data.socialSupport.relies_on.includes("partner") ? "yes" : null;
       user.RELIES_ON_RELATIVE = data.socialSupport.relies_on.includes("relative") ? "yes" : null;
       user.ENJOY_ON = data.socialSupport.enjoy_on;
       user.ENJOY_SAME_FRIEND = data.socialSupport.enjoy_same.includes("friend") ? "yes" : null;
       user.ENJOY_SAME_PARTNER = data.socialSupport.enjoy_same.includes("partner") ? "yes" : null;
       user.ENJOY_SAME_RELATIVE = data.socialSupport.enjoy_same.includes("relative") ? "yes" : null;
       user.NO_HELP = data.socialSupport.no_help;
       user.EMOTIONAL_ON = data.socialSupport.emotional_on;
       user.EMOTIONAL_LINK_FRIEND = data.socialSupport.emotional_link.includes("friend") ? "yes" : null;
       user.EMOTIONAL_LINK_PARTNER = data.socialSupport.emotional_link.includes("partner") ? "yes" : null;
       user.EMOTIONAL_LINK_RELATIVE = data.socialSupport.emotional_link.includes("relative") ? "yes" : null;
       user.COMFORTABLE = data.socialSupport.comfortable;
   }
   if (data.psychologicalTest != undefined) {
       user.ADMINISTERED_PSYCHOLOGICAL_TEST = data.psychologicalTest.administered_psychological_test;
       user.TIMED_PSYCHOLOGICAL_TEST = data.psychologicalTest.timed_psychological_test;
       user.COMFORTABLE_PSYCHOLOGICAL_TEST = data.psychologicalTest.comfortable_psychological_test;
   }
   if (data.immigrants != undefined) {
       user.IMMIGRANT_USABORN = data.immigrants.immigrant_USAborn;
       user.IMMIGRANT_GENERATION = data.immigrants.immigrants_generation;
       user.IMMIGRANT_BORN = data.immigrants.immigrant_born;
       user.IMMIGRANT_TOWN_SIZE = data.immigrants.immigrant_town_size;
       user.IMMIGRANT_URBANICITY = data.immigrants.immigrant_live_place;
       user.IMMIGRANT_NATIONALITY = data.immigrants.immigrant_nationality;
       user.IMMIGRANTS_MOVE_YEARS = data.immigrants.immigrants_move_years;
       user.IMMIGRANTS_MOVE_MONTHS = data.immigrants.immigrants_move_months;
       user.IMMIGRANT_DAILY_ACTIVITIES = data.immigrants.daily_activities;
       user.IMMIGRANT_DAILY_ACTIVITIES_SPECIFY = data.immigrants.daily_activities_specify;
       user.IMMIGRANT_JOB_TYPE = data.immigrants.immigrant_job_type;
       user.IMMIGRANT_FORMER_POSITION = data.immigrants.immigrant_current_position;
       user.IMMIGRANT_FORMER_POSITION_DESC = data.immigrants.immigrant_current_position_desc;
       user.IMMIGRANT_CONDITION_DESC = data.immigrants.immigrant_condition_desc;
       user.IMMIGRANT_PARTICIPATE_DESCISIONS = data.immigrants.immigrant_participate_decisions;
       user.IMMIGRANT_SUPERVISE_OTHERS = data.immigrants.immigrant_supervise_others;
   }
   if (data.acculturation != undefined) {
       user.MYSELFBEINGAMERICAN = data.acculturation.myselfBeingAmerican;
       user.FEELINGGOODAMERICAN = data.acculturation.feelingGoodAmerican;
       user.AMERICANIMPORTANT = data.acculturation.americanImportant;
       user.FEELAMERICANCULTURE = data.acculturation.feelAmericanCulture;
       user.STRONGBEINGAMERICAN = data.acculturation.stringBeingAmerican;
       user.PROUDAMERICAN = data.acculturation.proudAmerican;
       user.MYCULTUREBEING = data.acculturation.myCultureBeing;
       user.MYCULTUREBEINGGOOD = data.acculturation.myCultureBeingGood;
       user.MYCULTUREIMPORTINLIFE = data.acculturation.myCultureImportInLife;
       user.PARTOFCULTURE = data.acculturation.partOfCulture;
       user.BEINGOFCULTURE = data.acculturation.beingOfCulture;
       user.BEINGOFCULTUREPROUD = data.acculturation.beingOfCultureProud;
       user.ENGLISHSCHOOL = data.acculturation.englishschool;
       user.ENGLISHFRIENDS = data.acculturation.englishfriends;
       user.ENGLISHPHONE = data.acculturation.englishphone;
       user.ENGLISHSTRANGER = data.acculturation.englishstranger;
       user.ENGLISHGENERAL = data.acculturation.englishgeneral;
       user.ENGLISHTV = data.acculturation.englishtv;
       user.ENGLISHNEWSPAPER = data.acculturation.englishnewspaper;
       user.ENGLISHSONGS = data.acculturation.englishsongs;
       user.ENGLISHUGENERAL = data.acculturation.englishhugeneral;
       user.NATIVEFAMILY = data.acculturation.nativefamily;
       user.NATIVEFRIENDS = data.acculturation.nativefriends;
       user.NATIVEPHONE = data.acculturation.nativephone;
       user.NATIVESTRANGERS = data.acculturation.nativestrangers;
       user.NATIVEGENERAL = data.acculturation.nativegeneral;
       user.NATIVETV = data.acculturation.nativetv;
       user.NATIVENEWSPAPER = data.acculturation.nativenewspaper;
       user.NATIVESONGS = data.acculturation.nativesongs;
       user.NATIVEUGENERAL = data.acculturation.nativeugeneral;
       user.KNOWAMERICANHEROES = data.acculturation.knowAmericanHeroes;
       user.KNOWAMERICANTV = data.acculturation.knowAmericantv;
       user.KNOWAMERICANNEWSPAPER = data.acculturation.knowAmericanNewspaper;
       user.KNOWAMERICANACTOR = data.acculturation.lnowAmericanActor;
       user.KNOWAMERICANHISTORY = data.acculturation.knowAmericanHistory;
       user.KNOWAMERICANLEADER = data.acculturation.knowAmericanLeader;
       user.KNOWNATIVEHEROES = data.acculturation.knowNativeHeroes;
       user.KNOWNATIVETV = data.acculturation.knowNativetv;
       user.KNOWNATIVENEWSPAPER = data.acculturation.knowNativeNewspaper;
       user.KNOWNATIVEACTOR = data.acculturation.knowNativeActor;
       user.KNOWNATIVEHISTORY = data.acculturation.knowNativeHistory;
       user.KNOWNATIVELEADER = data.acculturation.knowNativeLeader;
   }
}
function csvMoCAMMSE(user, data) {
    user.ORIENT_year = null;
    user.ORIENT_month = null;
    user.ORIENT_day = null;
    user.ORIENT_dayweek = null;
    user.ORIENT_hour = null;
    user.ORIENT_minutes = null;
    user.ORIENT_AMPM = null;
    user.ORIENT_country = null;
    user.ORIENT_county = null;
    user.ORIENT_city = null;
    user.ORIENT_location = null;
    user.ORIENT_floor = null;
    user.ORIENT_score = null;

    if (data.mocammse != undefined) {
        user.ORIENT_year = data.mocammse.userYear;
        user.ORIENT_month = data.mocammse.userMonth;
        user.ORIENT_day = data.mocammse.userDate;
        user.ORIENT_dayweek = data.mocammse.userDay;
        user.ORIENT_hour = data.mocammse.userTimeHour;
        user.ORIENT_minutes = data.mocammse.userTimeMin;
        user.ORIENT_AMPM = data.mocammse.userTimeAMPM;
        user.ORIENT_country = data.mocammse.userCountry;
        user.ORIENT_county = data.mocammse.userCounty;
        user.ORIENT_city = data.mocammse.userCityTown;
        user.ORIENT_location = data.mocammse.userSite;
        user.ORIENT_floor = data.mocammse.userFloor;
        user.ORIENT_score = null;
    }
}
function csvRCF(user, data) {
    user.RCF1_Time = null;
    user.RCF1_file = null;
    user.RCF1_Score = null;
    user.RCF2_Time = null;
    user.RCF2_file = null;
    user.RCF2_Score = null;
    user.RCF3_Time = null;
    user.RCF3_file = null;
    user.RCF3_Score = null;

    if (data.reyComplexFigure != undefined && data.reyComplexFigure.length > 0) {
        for (var i = 0; i < data.reyComplexFigure.length; i++) {
            if (data.reyComplexFigure[i].figure == 1) {
                user.RCF1_Time = data.reyComplexFigure[i].time;
                user.RCF1_file = data.reyComplexFigure[i].imagePath;
                user.RCF1_Score = null;
            } else if (data.reyComplexFigure[i].figure == 2) {
                user.RCF2_Time = data.reyComplexFigure[i].time;
                user.RCF2_file = data.reyComplexFigure[i].imagePath;
                user.RCF2_Score = null;
            } else if (data.reyComplexFigure[i].figure == 3) {
                user.RCF3_Time = data.reyComplexFigure[i].time;
                user.RCF3_file = data.reyComplexFigure[i].imagePath;
                user.RCF3_Score = null;
            }
        }

        console.log(user);
    }
}
function csvRCF4(user, data) {
    var answers = [2, 5, 7, 8, 9, 12, 13, 15, 19, 20, 22, 24];

    user.RCFT4_1 = null;
    user.RCFT4_2 = null;
    user.RCFT4_3 = null;
    user.RCFT4_4 = null;
    user.RCFT4_5 = null;
    user.RCFT4_6 = null;
    user.RCFT4_7 = null;
    user.RCFT4_8 = null;
    user.RCFT4_9 = null;
    user.RCFT4_10 = null;
    user.RCFT4_11 = null;
    user.RCFT4_12 = null;
    user.RCFT4_13 = null;
    user.RCFT4_14 = null;
    user.RCFT4_15 = null;
    user.RCFT4_16 = null;
    user.RCFT4_17 = null;
    user.RCFT4_18 = null;
    user.RCFT4_19 = null;
    user.RCFT4_20 = null;
    user.RCFT4_21 = null;
    user.RCFT4_22 = null;
    user.RCFT4_23 = null;
    user.RCFT4_24 = null;
    // TODO: Calculate
    user.RCF4_Hits = null;
    user.RCF4_Omissions = null;
    user.RCF4_Commissions = null;

    if (data.reyComplexFigure4 != undefined) {
        user.RCFT4_1 = data.reyComplexFigure4.RCFT4_1;
        user.RCFT4_2 = data.reyComplexFigure4.RCFT4_2;
        user.RCFT4_3 = data.reyComplexFigure4.RCFT4_3;
        user.RCFT4_4 = data.reyComplexFigure4.RCFT4_4;
        user.RCFT4_5 = data.reyComplexFigure4.RCFT4_5;
        user.RCFT4_6 = data.reyComplexFigure4.RCFT4_6;
        user.RCFT4_7 = data.reyComplexFigure4.RCFT4_7;
        user.RCFT4_8 = data.reyComplexFigure4.RCFT4_8;
        user.RCFT4_9 = data.reyComplexFigure4.RCFT4_9;
        user.RCFT4_10 = data.reyComplexFigure4.RCFT4_10;
        user.RCFT4_11 = data.reyComplexFigure4.RCFT4_11;
        user.RCFT4_12 = data.reyComplexFigure4.RCFT4_12;
        user.RCFT4_13 = data.reyComplexFigure4.RCFT4_13;
        user.RCFT4_14 = data.reyComplexFigure4.RCFT4_14;
        user.RCFT4_15 = data.reyComplexFigure4.RCFT4_15;
        user.RCFT4_16 = data.reyComplexFigure4.RCFT4_16;
        user.RCFT4_17 = data.reyComplexFigure4.RCFT4_17;
        user.RCFT4_18 = data.reyComplexFigure4.RCFT4_18;
        user.RCFT4_19 = data.reyComplexFigure4.RCFT4_19;
        user.RCFT4_20 = data.reyComplexFigure4.RCFT4_20;
        user.RCFT4_21 = data.reyComplexFigure4.RCFT4_21;
        user.RCFT4_22 = data.reyComplexFigure4.RCFT4_22;
        user.RCFT4_23 = data.reyComplexFigure4.RCFT4_23;
        user.RCFT4_24 = data.reyComplexFigure4.RCFT4_24;

        var hits = 0;
        var omissions = 0;
        var commissions = 0;

        // Put all rey complex figure variables in an array
        var rcf4 = [];

        for (var p in user) {
            if (user.hasOwnProperty(p) && p.startsWith("RCFT4_")) {
                rcf4.push(user[p]);
            }
        }

        for (var i = 0; i < rcf4.length; i++) {
            if (answers.indexOf(i + 1) > -1) {
                // Correct image
                if (rcf4[i] == "Yes") {
                    hits++;
                } else if (rcf4[i] == "No") {
                    omissions++;
                }
            } else {
                // Not correct image
                if (rcf4[i] == "Yes") {
                    commissions++;
                }
            }
        }

        user.RCF4_Hits = hits;
        user.RCF4_Omissions = omissions;
        user.RCF4_Commissions = commissions;
    }


}
function csvClockDrawing(user, data) {
    if (data.clockDrawing != undefined) {
        user.CLOCK_time = data.clockDrawing.userYear;
        if (data.clockDrawing.imagePath != undefined) {
            user.CLOCK_file = url + "/static_data/" + data.clockDrawing.imagePath;
        } else {
            user.CLOCK_file = null;
        }
    } else {
        user.CLOCK_time = null;
        user.CLOCK_file = null;
    }

    user.CLOCK_Score = null;
}
function csvTrailMaking(user, data) {
    if (data.trailMaking != undefined) {
        if (data.trailMaking.imagePath != undefined) {
            user.TMTA_file = url + "/static_data/" + data.trailMaking.imagePath;
        } else {
            user.TMTA_file = null;
        }

        user.TMTA_time = data.trailMaking.time;
        user.TMTA_errors = null;

        if (data.trailMaking.imagePath2 != undefined) {
            user.TMTB_file = url + "/static_data/" + data.trailMaking.imagePath2;
        } else {
            user.TMTB_file = null;
        }

        user.TMTB_time = data.trailMaking.time2;
        user.TMTB_errors = null;
    } else {
        user.TMTA_file = null;
        user.TMTA_time = null;
        user.TMTA_errors = null;
        user.TMTB_file = null;
        user.TMTB_time = null;
        user.TMTB_errors = null;
    }
}
function csvPitchRecognition(user, data) {
    if (data.pitch != undefined) {
        user.MELODIES_1 = data.pitch.task1;
        user.MELODIES_2 = data.pitch.task2;
        user.MELODIES_3 = data.pitch.task3;
        user.MELODIES_4 = data.pitch.task4;
        user.MELODIES_5 = data.pitch.task5;
        user.MELODIES_6 = data.pitch.task6;
        user.MELODIES_7 = data.pitch.task7;
        user.MELODIES_8 = data.pitch.task8;
        user.MELODIES_9 = data.pitch.task9;
        user.MELODIES_10 = data.pitch.task10;
        user.MELODIES_11 = data.pitch.task11;
        user.MELODIES_12 = data.pitch.task12;
        user.MELODIES_13 = data.pitch.task13;
        user.MELODIES_14 = data.pitch.task14;
        user.MELODIES_15 = data.pitch.task15;
        user.MELODIES_16 = data.pitch.task16;
        user.MELODIES_17 = data.pitch.task17;
        user.MELODIES_18 = data.pitch.task18;
        user.MELODIES_19 = data.pitch.task19;
        user.MELODIES_20 = data.pitch.task20;
        user.MELODIES_21 = data.pitch.task21;
        user.MELODIES_22 = data.pitch.task22;
        user.MELODIES_23 = data.pitch.task23;
        user.MELODIES_24 = data.pitch.task24;
        user.MELODIES_total = data.pitch.score;
    } else {
        user.MELODIES_1 = null;
        user.MELODIES_2 = null;
        user.MELODIES_3 = null;
        user.MELODIES_4 = null;
        user.MELODIES_5 = null;
        user.MELODIES_6 = null;
        user.MELODIES_7 = null;
        user.MELODIES_8 = null;
        user.MELODIES_9 = null;
        user.MELODIES_10 = null;
        user.MELODIES_11 = null;
        user.MELODIES_12 = null;
        user.MELODIES_13 = null;
        user.MELODIES_14 = null;
        user.MELODIES_15 = null;
        user.MELODIES_16 = null;
        user.MELODIES_17 = null;
        user.MELODIES_18 = null;
        user.MELODIES_19 = null;
        user.MELODIES_20 = null;
        user.MELODIES_21 = null;
        user.MELODIES_22 = null;
        user.MELODIES_23 = null;
        user.MELODIES_24 = null;
        user.MELODIES_total = null;
    }
}
function csvDigitsSpan(user, data) {
    if (data.digitsSpan != undefined) {
        if (data.digitsSpan.DSFWD1_file != undefined) {
            user.DSFWD1_file = url + "/static_data/" + data.digitsSpan.DSFWD1_file;
        } else {
            user.DSFWD1_file = null;
        }

        user.DSFWD1_correct = null;
        user.DSFWD2_file = url + "/static_data/" + data.digitsSpan.DSFWD2_file;
        user.DSFWD2_correct = null;
        user.DSFWD3_file = url + "/static_data/" + data.digitsSpan.DSFWD3_file;
        user.DSFWD3_correct = null;
        user.DSFWD4_file = url + "/static_data/" + data.digitsSpan.DSFWD4_file;
        user.DSFWD4_correct = null;
        user.DSFWD5_file = url + "/static_data/" + data.digitsSpan.DSFWD5_file;
        user.DSFWD5_correct = null;
        user.DSFWD6_file = url + "/static_data/" + data.digitsSpan.DSFWD6_file;
        user.DSFWD6_correct = null;
        user.DSFWD7_file = url + "/static_data/" + data.digitsSpan.DSFWD7_file;
        user.DSFWD7_correct = null;
        user.DSFWD8_file = url + "/static_data/" + data.digitsSpan.DSFWD8_file;
        user.DSFWD8_correct = null;
        user.DSFWD9_file = url + "/static_data/" + data.digitsSpan.DSFWD9_file;
        user.DSFWD9_correct = null;
        user.DSFWD10_file = url + "/static_data/" + data.digitsSpan.DSFWD10_file;
        user.DSFWD10_correct = null;
        user.DSFWD11_file = url + "/static_data/" + data.digitsSpan.DSFWD11_file;
        user.DSFWD11_correct = null;
        user.DSFWD12_file = url + "/static_data/" + data.digitsSpan.DSFWD12_file;
        user.DSFWD12_correct = null;
        user.DSFWD13_file = url + "/static_data/" + data.digitsSpan.DSFWD13_file;
        user.DSFWD13_correct = null;
        user.DSFWD14_file = url + "/static_data/" + data.digitsSpan.DSFWD14_file;
        user.DSFWD14_correct = null;
        user.DSFWD_totalcorrect = null;
        user.DSFWD_longstseries = null;
        user.DSBWD1_file = url + "/static_data/" + data.digitsSpan.DSBWD1_file;
        user.DSBWD1_correct = null;
        user.DSBWD2_file = url + "/static_data/" + data.digitsSpan.DSBWD2_file;
        user.DSBWD2_correct = null;
        user.DSBWD3_file = url + "/static_data/" + data.digitsSpan.DSBWD3_file;
        user.DSBWD3_correct = null;
        user.DSBWD4_file = url + "/static_data/" + data.digitsSpan.DSBWD4_file;
        user.DSBWD4_correct = null;
        user.DSBWD5_file = url + "/static_data/" + data.digitsSpan.DSBWD5_file;
        user.DSBWD5_correct = null;
        user.DSBWD6_file = url + "/static_data/" + data.digitsSpan.DSBWD6_file;
        user.DSBWD6_correct = null;
        user.DSBWD7_file = url + "/static_data/" + data.digitsSpan.DSBWD7_file;
        user.DSBWD7_correct = null;
        user.DSBWD8_file = url + "/static_data/" + data.digitsSpan.DSBWD8_file;
        user.DSBWD8_correct = null;
        user.DSBWD9_file = url + "/static_data/" + data.digitsSpan.DSBWD9_file;
        user.DSBWD9_correct = null;
        user.DSBWD10_file = url + "/static_data/" + data.digitsSpan.DSBWD10_file;
        user.DSBWD10_correct = null;
        user.DSBWD11_file = url + "/static_data/" + data.digitsSpan.DSBWD11_file;
        user.DSBWD11_correct = null;
        user.DSBWD12_file = url + "/static_data/" + data.digitsSpan.DSBWD12_file;
        user.DSBWD12_correct = null;
        user.DSBWD13_file = url + "/static_data/" + data.digitsSpan.DSBWD13_file;
        user.DSBWD13_correct = null;
        user.DSBWD14_file = url + "/static_data/" + data.digitsSpan.DSBWD14_file;
        user.DSBWD14_correct = null;
        user.DSBWD_totalcorrect = null;
        user.DSBWD_longstseries = null;
    } else {
        user.DSFWD1_file = null;
        user.DSFWD1_correct = null;
        user.DSFWD2_file = null;
        user.DSFWD2_correct = null;
        user.DSFWD3_file = null;
        user.DSFWD3_correct = null;
        user.DSFWD4_file = null;
        user.DSFWD4_correct = null;
        user.DSFWD5_file = null;
        user.DSFWD5_correct = null;
        user.DSFWD6_file = null;
        user.DSFWD6_correct = null;
        user.DSFWD7_file = null;
        user.DSFWD7_correct = null;
        user.DSFWD8_file = null;
        user.DSFWD8_correct = null;
        user.DSFWD9_file = null;
        user.DSFWD9_correct = null;
        user.DSFWD10_file = null;
        user.DSFWD10_correct = null;
        user.DSFWD11_file = null;
        user.DSFWD11_correct = null;
        user.DSFWD12_file = null;
        user.DSFWD12_correct = null;
        user.DSFWD13_file = null;
        user.DSFWD13_correct = null;
        user.DSFWD14_file = null;
        user.DSFWD14_correct = null;
        user.DSFWD_totalcorrect = null;
        user.DSFWD_longstseries = null;
        user.DSBWD1_file = null;
        user.DSBWD1_correct = null;
        user.DSBWD2_file = null;
        user.DSBWD2_correct = null;
        user.DSBWD3_file = null;
        user.DSBWD3_correct = null;
        user.DSBWD4_file = null;
        user.DSBWD4_correct = null;
        user.DSBWD5_file = null;
        user.DSBWD5_correct = null;
        user.DSBWD6_file = null;
        user.DSBWD6_correct = null;
        user.DSBWD7_file = null;
        user.DSBWD7_correct = null;
        user.DSBWD8_file = null;
        user.DSBWD8_correct = null;
        user.DSBWD9_file = null;
        user.DSBWD9_correct = null;
        user.DSBWD10_file = null;
        user.DSBWD10_correct = null;
        user.DSBWD11_file = null;
        user.DSBWD11_correct = null;
        user.DSBWD12_file = null;
        user.DSBWD12_correct = null;
        user.DSBWD13_file = null;
        user.DSBWD13_correct = null;
        user.DSBWD14_file = null;
        user.DSBWD14_correct = null;
        user.DSBWD_totalcorrect = null;
        user.DSBWD_longstseries = null;
    }
}
function csvMatrices(user, data) {
    if (data.matrices != undefined) {
        user.MATRICES1_answer = data.matrices.question1;
        user.MATRICES1_correct = 4;
        user.MATRICES2_answer = data.matrices.question2;
        user.MATRICES2_correct = 5;
        user.MATRICES3_answer = data.matrices.question3;
        user.MATRICES3_correct = 2;
        user.MATRICES4_answer = data.matrices.question4;
        user.MATRICES4_correct = 3;
        user.MATRICES5_answer = data.matrices.question5;
        user.MATRICES5_correct = 6;
        user.MATRICES6_answer = data.matrices.question6;
        user.MATRICES6_correct = 1;
        user.MATRICES7_answer = data.matrices.question7;
        user.MATRICES7_correct = 2;
        user.MATRICES8_answer = data.matrices.question8;
        user.MATRICES8_correct = 6;
        user.MATRICES9_answer = data.matrices.question9;
        user.MATRICES9_correct = 1;
        user.MATRICES10_answer = data.matrices.question10;
        user.MATRICES10_correct = 3;
        user.MATRICES11_answer = data.matrices.question11;
        user.MATRICES11_correct = 4;
        user.MATRICES12_answer = data.matrices.question12;
        user.MATRICES12_correct = 2;
        user.MATRICES13_answer = data.matrices.question13;
        user.MATRICES13_correct = 1;
        user.MATRICES14_answer = data.matrices.question14;
        user.MATRICES14_correct = 6;
        user.MATRICES15_answer = data.matrices.question15;
        user.MATRICES15_correct = 3;
        user.MATRICES16_answer = data.matrices.question16;
        user.MATRICES16_correct = 6;
        user.MATRICES17_answer = data.matrices.question17;
        user.MATRICES17_correct = 2;
        user.MATRICES18_answer = data.matrices.question18;
        user.MATRICES18_correct = 3;
        user.MATRICES19_answer = data.matrices.question19;
        user.MATRICES19_correct = 5;
        user.MATRICES20_answer = data.matrices.question20;
        user.MATRICES20_correct = 4;
        user.MATRICES21_answer = data.matrices.question21;
        user.MATRICES21_correct = 4;
        user.MATRICES22_answer = data.matrices.question22;
        user.MATRICES22_correct = 1;
        user.MATRICES23_answer = data.matrices.question23;
        user.MATRICES23_correct = 2;
        user.MATRICES24_answer = data.matrices.question24;
        user.MATRICES24_correct = 5;
        user.MATRICES25_answer = data.matrices.question25;
        user.MATRICES25_correct = 2;
        user.MATRICES26_answer = data.matrices.question26;
        user.MATRICES26_correct = 1;
        user.MATRICES27_answer = data.matrices.question27;
        user.MATRICES27_correct = 4;
        user.MATRICES28_answer = data.matrices.question28;
        user.MATRICES28_correct = 7;
        user.MATRICES29_answer = data.matrices.question29;
        user.MATRICES29_correct = 2;
        user.MATRICES30_answer = data.matrices.question30;
        user.MATRICES30_correct = 8;
        user.MATRICES31_answer = data.matrices.question31;
        user.MATRICES31_correct = 6;
        user.MATRICES32_answer = data.matrices.question32;
        user.MATRICES32_correct = 5;
        user.MATRICES33_answer = data.matrices.question33;
        user.MATRICES33_correct = 3;
        user.MATRICES34_answer = data.matrices.question34;
        user.MATRICES34_correct = 8;
        user.MATRICES35_answer = data.matrices.question35;
        user.MATRICES35_correct = 6;
        user.MATRICES36_answer = data.matrices.question36;
        user.MATRICES36_correct = 4;
        user.MATRICES37_answer = data.matrices.question37;
        user.MATRICES37_correct = 1;
        user.MATRICES38_answer = data.matrices.question38;
        user.MATRICES38_correct = 6;
        user.MATRICES39_answer = data.matrices.question39;
        user.MATRICES39_correct = 4;
        user.MATRICES40_answer = data.matrices.question40;
        user.MATRICES40_correct = 2;
        user.MATRICES41_answer = data.matrices.question41;
        user.MATRICES41_correct = 7;
        user.MATRICES42_answer = data.matrices.question42;
        user.MATRICES42_correct = 3;
        user.MATRICES43_answer = data.matrices.question43;
        user.MATRICES43_correct = 8;
        user.MATRICES44_answer = data.matrices.question44;
        user.MATRICES44_correct = 5;
        user.MATRICES45_answer = data.matrices.question45;
        user.MATRICES45_correct = 2;
        user.MATRICES46_answer = data.matrices.question46;
        user.MATRICES46_correct = 8;
        user.MATRICES47_answer = data.matrices.question47;
        user.MATRICES47_correct = 7;
        user.MATRICES48_answer = data.matrices.question48;
        user.MATRICES48_correct = 6;
        user.MATRICES49_answer = data.matrices.question49;
        user.MATRICES49_correct = 1;
        user.MATRICES50_answer = data.matrices.question50;
        user.MATRICES50_correct = 5;
        user.MATRICES51_answer = data.matrices.question51;
        user.MATRICES51_correct = 3;
        user.MATRICES52_answer = data.matrices.question52;
        user.MATRICES52_correct = 8;
        user.MATRICES53_answer = data.matrices.question53;
        user.MATRICES53_correct = 6;
        user.MATRICES54_answer = data.matrices.question54;
        user.MATRICES54_correct = 7;
        user.MATRICES55_answer = data.matrices.question55;
        user.MATRICES55_correct = 7;
        user.MATRICES56_answer = data.matrices.question56;
        user.MATRICES56_correct = 2;
        user.MATRICES57_answer = data.matrices.question57;
        user.MATRICES57_correct = 5;
        user.MATRICES58_answer = data.matrices.question58;
        user.MATRICES58_correct = 4;
        user.MATRICES59_answer = data.matrices.question59;
        user.MATRICES59_correct = 1;
        user.MATRICES60_answer = data.matrices.question60;
        user.MATRICES60_correct = 4;
        user.MATRICES_totalcorrect = 4;
    } else {
        user.MATRICES1_answer = null;
        user.MATRICES1_correct = null;
        user.MATRICES2_answer = null;
        user.MATRICES2_correct = null;
        user.MATRICES3_answer = null;
        user.MATRICES3_correct = null;
        user.MATRICES4_answer = null;
        user.MATRICES4_correct = null;
        user.MATRICES5_answer = null;
        user.MATRICES5_correct = null;
        user.MATRICES6_answer = null;
        user.MATRICES6_correct = null;
        user.MATRICES7_answer = null;
        user.MATRICES7_correct = null;
        user.MATRICES8_answer = null;
        user.MATRICES8_correct = null;
        user.MATRICES9_answer = null;
        user.MATRICES9_correct = null;
        user.MATRICES10_answer = null;
        user.MATRICES10_correct = null;
        user.MATRICES11_answer = null;
        user.MATRICES11_correct = null;
        user.MATRICES12_answer = null;
        user.MATRICES12_correct = null;
        user.MATRICES13_answer = null;
        user.MATRICES13_correct = null;
        user.MATRICES14_answer = null;
        user.MATRICES14_correct = null;
        user.MATRICES15_answer = null;
        user.MATRICES15_correct = null;
        user.MATRICES16_answer = null;
        user.MATRICES16_correct = null;
        user.MATRICES17_answer = null;
        user.MATRICES17_correct = null;
        user.MATRICES18_answer = null;
        user.MATRICES18_correct = null;
        user.MATRICES19_answer = null;
        user.MATRICES19_correct = null;
        user.MATRICES20_answer = null;
        user.MATRICES20_correct = null;
        user.MATRICES21_answer = null;
        user.MATRICES21_correct = null;
        user.MATRICES22_answer = null;
        user.MATRICES22_correct = null;
        user.MATRICES23_answer = null;
        user.MATRICES23_correct = null;
        user.MATRICES24_answer = null;
        user.MATRICES24_correct = null;
        user.MATRICES25_answer = null;
        user.MATRICES25_correct = null;
        user.MATRICES26_answer = null;
        user.MATRICES26_correct = null;
        user.MATRICES27_answer = null;
        user.MATRICES27_correct = null;
        user.MATRICES28_answer = null;
        user.MATRICES28_correct = null;
        user.MATRICES29_answer = null;
        user.MATRICES29_correct = null;
        user.MATRICES30_answer = null;
        user.MATRICES30_correct = null;
        user.MATRICES31_answer = null;
        user.MATRICES31_correct = null;
        user.MATRICES32_answer = null;
        user.MATRICES32_correct = null;
        user.MATRICES33_answer = null;
        user.MATRICES33_correct = null;
        user.MATRICES34_answer = null;
        user.MATRICES34_correct = null;
        user.MATRICES35_answer = null;
        user.MATRICES35_correct = null;
        user.MATRICES36_answer = null;
        user.MATRICES36_correct = null;
        user.MATRICES37_answer = null;
        user.MATRICES37_correct = null;
        user.MATRICES38_answer = null;
        user.MATRICES38_correct = null;
        user.MATRICES39_answer = null;
        user.MATRICES39_correct = null;
        user.MATRICES40_answer = null;
        user.MATRICES40_correct = null;
        user.MATRICES41_answer = null;
        user.MATRICES41_correct = null;
        user.MATRICES42_answer = null;
        user.MATRICES42_correct = null;
        user.MATRICES43_answer = null;
        user.MATRICES43_correct = null;
        user.MATRICES44_answer = null;
        user.MATRICES44_correct = null;
        user.MATRICES45_answer = null;
        user.MATRICES45_correct = null;
        user.MATRICES46_answer = null;
        user.MATRICES46_correct = null;
        user.MATRICES47_answer = null;
        user.MATRICES47_correct = null;
        user.MATRICES48_answer = null;
        user.MATRICES48_correct = null;
        user.MATRICES49_answer = null;
        user.MATRICES49_correct = null;
        user.MATRICES50_answer = null;
        user.MATRICES50_correct = null;
        user.MATRICES51_answer = null;
        user.MATRICES51_correct = null;
        user.MATRICES52_answer = null;
        user.MATRICES52_correct = null;
        user.MATRICES53_answer = null;
        user.MATRICES53_correct = null;
        user.MATRICES54_answer = null;
        user.MATRICES54_correct = null;
        user.MATRICES55_answer = null;
        user.MATRICES55_correct = null;
        user.MATRICES56_answer = null;
        user.MATRICES56_correct = null;
        user.MATRICES57_answer = null;
        user.MATRICES57_correct = null;
        user.MATRICES58_answer = null;
        user.MATRICES58_correct = null;
        user.MATRICES59_answer = null;
        user.MATRICES59_correct = null;
        user.MATRICES60_answer = null;
        user.MATRICES60_correct = null;
        user.MATRICES_totalcorrect = null;
    }
}
function csvCPT(user, data) {
    // TODO: Finish CPT csv
    if (data.cpt != undefined) {
        if (data.cpt.stimuli == 1) {
            user.CPT_BLOCK1_1 = data.cpt.hit_time;
        }

    } else {

    }
}
function csvMotor(user, data) {
    if (data.motorTask != undefined) {
        if (data.motorTask.imagePath1 != undefined) {
            user.MOTOR1_dominant_file = url + "/static_data/" + data.motorTask.imagePath1;
        } else {
            user.MOTOR1_dominant_file = null;
        }
        user.MOTOR1_dominant_score = null;
        if (data.motorTask.imagePath2 != undefined) {
            user.MOTOR1_nondominant_file = url + "/static_data/" + data.motorTask.imagePath2;
        } else {
            user.MOTOR1_nondominant_file = null;
        }
        user.MOTOR1_nondominant_score = null;
        if (data.motorTask.imagePath3 != undefined) {
            user.MOTOR2_dominant_file = url + "/static_data/" + data.motorTask.imagePath3;
        } else {
            user.MOTOR2_dominant_file = null;
        }
        user.MOTOR2_dominant_score = null;
        if (data.motorTask.imagePath4 != undefined) {
            user.MOTOR2_nondominant_file = url + "/static_data/" + data.motorTask.imagePath4;
        } else {
            user.MOTOR2_dominant_file = null;
        }
        user.MOTOR2_nondominant_score = null;
        if (data.motorTask.imagePath5 != undefined) {
            user.MOTOR3_dominant_file = url + "/static_data/" + data.motorTask.imagePath5;
        } else {
            user.MOTOR3_dominant_file = null;
        }
        user.MOTOR3_dominant_score = null;
        if (data.motorTask.imagePath6 != undefined) {
            user.MOTOR3_nondominant_file = url + "/static_data/" + data.motorTask.imagePath6;
        } else {
            user.MOTOR3_nondominant_file = null;
        }
        user.MOTOR3_nondominant_score = null;
    } else {
        user.MOTOR1_dominant_file = null;
        user.MOTOR1_dominant_score = null;
        user.MOTOR1_nondominant_file = null;
        user.MOTOR1_nondominant_score = null;
        user.MOTOR2_dominant_file = null;
        user.MOTOR2_dominant_score = null;
        user.MOTOR2_nondominant_file = null;
        user.MOTOR2_nondominant_score = null;
        user.MOTOR3_dominant_file = null;
        user.MOTOR3_dominant_score = null;
        user.MOTOR3_nondominant_file = null;
        user.MOTOR3_nondominant_score = null;
    }
}
function csvWordList(user, data) {
    if (data.wordlist != undefined) {
        user.WORDLIST1_file = url + "/static_data/" + data.wordlist.trial1;
        user.WORDLIST1_1 = null;
        user.WORDLIST1_2 = null;
        user.WORDLIST1_3 = null;
        user.WORDLIST1_4 = null;
        user.WORDLIST1_5 = null;
        user.WORDLIST1_6 = null;
        user.WORDLIST1_7 = null;
        user.WORDLIST1_8 = null;
        user.WORDLIST1_9 = null;
        user.WORDLIST1_10 = null;
        user.WORDLIST1_11 = null;
        user.WORDLIST1_12 = null;
        user.WORDLIST1_13 = null;
        user.WORDLIST1_14 = null;
        user.WORDLIST1_15 = null;
        user.WORDLIST1_16 = null;
        user.WORDLIST1_total = null;
        user.WORDLIST1_intrusions = null;
        user.WORDLIST1_perseverations = null;
        user.WORDLIST2_file = url + "/static_data/" + data.wordlist.trial2;
        user.WORDLIST2_1 = null;
        user.WORDLIST2_2 = null;
        user.WORDLIST2_3 = null;
        user.WORDLIST2_4 = null;
        user.WORDLIST2_5 = null;
        user.WORDLIST2_6 = null;
        user.WORDLIST2_7 = null;
        user.WORDLIST2_8 = null;
        user.WORDLIST2_9 = null;
        user.WORDLIST2_10 = null;
        user.WORDLIST2_11 = null;
        user.WORDLIST2_12 = null;
        user.WORDLIST2_13 = null;
        user.WORDLIST2_14 = null;
        user.WORDLIST2_15 = null;
        user.WORDLIST2_16 = null;
        user.WORDLIST2_total = null;
        user.WORDLIST2_intrusions = null;
        user.WORDLIST2_perseverations = null;
        user.WORDLIST3_file = url + "/static_data/" + data.wordlist.trial3;
        user.WORDLIST3_1 = null;
        user.WORDLIST3_2 = null;
        user.WORDLIST3_3 = null;
        user.WORDLIST3_4 = null;
        user.WORDLIST3_5 = null;
        user.WORDLIST3_6 = null;
        user.WORDLIST3_7 = null;
        user.WORDLIST3_8 = null;
        user.WORDLIST3_9 = null;
        user.WORDLIST3_10 = null;
        user.WORDLIST3_11 = null;
        user.WORDLIST3_12 = null;
        user.WORDLIST3_13 = null;
        user.WORDLIST3_14 = null;
        user.WORDLIST3_15 = null;
        user.WORDLIST3_16 = null;
        user.WORDLIST3_total = null;
        user.WORDLIST3_intrusions = null;
        user.WORDLIST3_perseverations = null;
        user.WORDLIST4_file = url + "/static_data/" + data.wordlist.trial4;
        user.WORDLIST4_1 = null;
        user.WORDLIST4_2 = null;
        user.WORDLIST4_3 = null;
        user.WORDLIST4_4 = null;
        user.WORDLIST4_5 = null;
        user.WORDLIST4_6 = null;
        user.WORDLIST4_7 = null;
        user.WORDLIST4_8 = null;
        user.WORDLIST4_9 = null;
        user.WORDLIST4_10 = null;
        user.WORDLIST4_11 = null;
        user.WORDLIST4_12 = null;
        user.WORDLIST4_13 = null;
        user.WORDLIST4_14 = null;
        user.WORDLIST4_15 = null;
        user.WORDLIST4_16 = null;
        user.WORDLIST4_total = null;
        user.WORDLIST4_intrusions = null;
        user.WORDLIST4_perseverations = null;
        user.WORDLIST5_file = url + "/static_data/" + data.wordlist.trial5;
        user.WORDLIST5_1 = null;
        user.WORDLIST5_2 = null;
        user.WORDLIST5_3 = null;
        user.WORDLIST5_4 = null;
        user.WORDLIST5_5 = null;
        user.WORDLIST5_6 = null;
        user.WORDLIST5_7 = null;
        user.WORDLIST5_8 = null;
        user.WORDLIST5_9 = null;
        user.WORDLIST5_10 = null;
        user.WORDLIST5_11 = null;
        user.WORDLIST5_12 = null;
        user.WORDLIST5_13 = null;
        user.WORDLIST5_14 = null;
        user.WORDLIST5_15 = null;
        user.WORDLIST5_16 = null;
        user.WORDLIST5_total = null;
        user.WORDLIST5_intrusions = null;
        user.WORDLIST5_perseverations = null;
        user.WORDLISTB_file = url + "/static_data/" + data.wordlist.interference;
        user.WORDLISTB_1 = null;
        user.WORDLISTB_2 = null;
        user.WORDLISTB_3 = null;
        user.WORDLISTB_4 = null;
        user.WORDLISTB_5 = null;
        user.WORDLISTB_6 = null;
        user.WORDLISTB_7 = null;
        user.WORDLISTB_8 = null;
        user.WORDLISTB_9 = null;
        user.WORDLISTB_10 = null;
        user.WORDLISTB_11 = null;
        user.WORDLISTB_12 = null;
        user.WORDLISTB_13 = null;
        user.WORDLISTB_14 = null;
        user.WORDLISTB_15 = null;
        user.WORDLISTB_16 = null;
        user.WORDLISTB_total = null;
        user.WORDLISTB_intrusions = null;
        user.WORDLISTB_perseverations = null;
        user.WORDLIST_ST_file = url + "/static_data/" + data.wordlist.shortTerm;
        user.WORDLIST_ST_1 = null;
        user.WORDLIST_ST_2 = null;
        user.WORDLIST_ST_3 = null;
        user.WORDLIST_ST_4 = null;
        user.WORDLIST_ST_5 = null;
        user.WORDLIST_ST_6 = null;
        user.WORDLIST_ST_7 = null;
        user.WORDLIST_ST_8 = null;
        user.WORDLIST_ST_9 = null;
        user.WORDLIST_ST_10 = null;
        user.WORDLIST_ST_11 = null;
        user.WORDLIST_ST_12 = null;
        user.WORDLIST_ST_13 = null;
        user.WORDLIST_ST_14 = null;
        user.WORDLIST_ST_15 = null;
        user.WORDLIST_ST_16 = null;
        user.WORDLIST_ST_total = null;
        user.WORDLIST_ST_intrusions = null;
        user.WORDLIST_ST_perseverations = null;
    } else {
        user.WORDLIST1_file = null;
        user.WORDLIST1_1 = null;
        user.WORDLIST1_2 = null;
        user.WORDLIST1_3 = null;
        user.WORDLIST1_4 = null;
        user.WORDLIST1_5 = null;
        user.WORDLIST1_6 = null;
        user.WORDLIST1_7 = null;
        user.WORDLIST1_8 = null;
        user.WORDLIST1_9 = null;
        user.WORDLIST1_10 = null;
        user.WORDLIST1_11 = null;
        user.WORDLIST1_12 = null;
        user.WORDLIST1_13 = null;
        user.WORDLIST1_14 = null;
        user.WORDLIST1_15 = null;
        user.WORDLIST1_16 = null;
        user.WORDLIST1_total = null;
        user.WORDLIST1_intrusions = null;
        user.WORDLIST1_perseverations = null;
        user.WORDLIST2_file = null;
        user.WORDLIST2_1 = null;
        user.WORDLIST2_2 = null;
        user.WORDLIST2_3 = null;
        user.WORDLIST2_4 = null;
        user.WORDLIST2_5 = null;
        user.WORDLIST2_6 = null;
        user.WORDLIST2_7 = null;
        user.WORDLIST2_8 = null;
        user.WORDLIST2_9 = null;
        user.WORDLIST2_10 = null;
        user.WORDLIST2_11 = null;
        user.WORDLIST2_12 = null;
        user.WORDLIST2_13 = null;
        user.WORDLIST2_14 = null;
        user.WORDLIST2_15 = null;
        user.WORDLIST2_16 = null;
        user.WORDLIST2_total = null;
        user.WORDLIST2_intrusions = null;
        user.WORDLIST2_perseverations = null;
        user.WORDLIST3_file = null;
        user.WORDLIST3_1 = null;
        user.WORDLIST3_2 = null;
        user.WORDLIST3_3 = null;
        user.WORDLIST3_4 = null;
        user.WORDLIST3_5 = null;
        user.WORDLIST3_6 = null;
        user.WORDLIST3_7 = null;
        user.WORDLIST3_8 = null;
        user.WORDLIST3_9 = null;
        user.WORDLIST3_10 = null;
        user.WORDLIST3_11 = null;
        user.WORDLIST3_12 = null;
        user.WORDLIST3_13 = null;
        user.WORDLIST3_14 = null;
        user.WORDLIST3_15 = null;
        user.WORDLIST3_16 = null;
        user.WORDLIST3_total = null;
        user.WORDLIST3_intrusions = null;
        user.WORDLIST3_perseverations = null;
        user.WORDLIST4_file = null;
        user.WORDLIST4_1 = null;
        user.WORDLIST4_2 = null;
        user.WORDLIST4_3 = null;
        user.WORDLIST4_4 = null;
        user.WORDLIST4_5 = null;
        user.WORDLIST4_6 = null;
        user.WORDLIST4_7 = null;
        user.WORDLIST4_8 = null;
        user.WORDLIST4_9 = null;
        user.WORDLIST4_10 = null;
        user.WORDLIST4_11 = null;
        user.WORDLIST4_12 = null;
        user.WORDLIST4_13 = null;
        user.WORDLIST4_14 = null;
        user.WORDLIST4_15 = null;
        user.WORDLIST4_16 = null;
        user.WORDLIST4_total = null;
        user.WORDLIST4_intrusions = null;
        user.WORDLIST4_perseverations = null;
        user.WORDLIST5_file = null;
        user.WORDLIST5_1 = null;
        user.WORDLIST5_2 = null;
        user.WORDLIST5_3 = null;
        user.WORDLIST5_4 = null;
        user.WORDLIST5_5 = null;
        user.WORDLIST5_6 = null;
        user.WORDLIST5_7 = null;
        user.WORDLIST5_8 = null;
        user.WORDLIST5_9 = null;
        user.WORDLIST5_10 = null;
        user.WORDLIST5_11 = null;
        user.WORDLIST5_12 = null;
        user.WORDLIST5_13 = null;
        user.WORDLIST5_14 = null;
        user.WORDLIST5_15 = null;
        user.WORDLIST5_16 = null;
        user.WORDLIST5_total = null;
        user.WORDLIST5_intrusions = null;
        user.WORDLIST5_perseverations = null;
        user.WORDLISTB_file = null;
        user.WORDLISTB_1 = null;
        user.WORDLISTB_2 = null;
        user.WORDLISTB_3 = null;
        user.WORDLISTB_4 = null;
        user.WORDLISTB_5 = null;
        user.WORDLISTB_6 = null;
        user.WORDLISTB_7 = null;
        user.WORDLISTB_8 = null;
        user.WORDLISTB_9 = null;
        user.WORDLISTB_10 = null;
        user.WORDLISTB_11 = null;
        user.WORDLISTB_12 = null;
        user.WORDLISTB_13 = null;
        user.WORDLISTB_14 = null;
        user.WORDLISTB_15 = null;
        user.WORDLISTB_16 = null;
        user.WORDLISTB_total = null;
        user.WORDLISTB_intrusions = null;
        user.WORDLISTB_perseverations = null;
        user.WORDLIST_ST_file = null;
        user.WORDLIST_ST_1 = null;
        user.WORDLIST_ST_2 = null;
        user.WORDLIST_ST_3 = null;
        user.WORDLIST_ST_4 = null;
        user.WORDLIST_ST_5 = null;
        user.WORDLIST_ST_6 = null;
        user.WORDLIST_ST_7 = null;
        user.WORDLIST_ST_8 = null;
        user.WORDLIST_ST_9 = null;
        user.WORDLIST_ST_10 = null;
        user.WORDLIST_ST_11 = null;
        user.WORDLIST_ST_12 = null;
        user.WORDLIST_ST_13 = null;
        user.WORDLIST_ST_14 = null;
        user.WORDLIST_ST_15 = null;
        user.WORDLIST_ST_16 = null;
        user.WORDLIST_ST_total = null;
        user.WORDLIST_ST_intrusions = null;
        user.WORDLIST_ST_perseverations = null;
    }
}
function csvWordList2(user, data) {
    //TODO: Calculate the hits, omissions, and commissions
    if (data.wordlist2 != undefined) {
        user.WORDLIST_LT_file = url + "/static_data/" + data.wordlist2.audioPath;
        user.WORDLIST_LT_1 = null;
        user.WORDLIST_LT_2 = null;
        user.WORDLIST_LT_3 = null;
        user.WORDLIST_LT_4 = null;
        user.WORDLIST_LT_5 = null;
        user.WORDLIST_LT_6 = null;
        user.WORDLIST_LT_7 = null;
        user.WORDLIST_LT_8 = null;
        user.WORDLIST_LT_9 = null;
        user.WORDLIST_LT_10 = null;
        user.WORDLIST_LT_11 = null;
        user.WORDLIST_LT_12 = null;
        user.WORDLIST_LT_13 = null;
        user.WORDLIST_LT_14 = null;
        user.WORDLIST_LT_15 = null;
        user.WORDLIST_LT_16 = null;
        user.WORDLIST_LT_total = null;
        user.WORDLIST_LT_intrusions = null;
        user.WORDLIST_LT_perseverations = null;
        user.WORDLIST_REC_1 = data.wordlist2.question1;
        user.WORDLIST_REC_2 = data.wordlist2.question2;
        user.WORDLIST_REC_3 = data.wordlist2.question3;
        user.WORDLIST_REC_4 = data.wordlist2.question4;
        user.WORDLIST_REC_5 = data.wordlist2.question5;
        user.WORDLIST_REC_6 = data.wordlist2.question6;
        user.WORDLIST_REC_7 = data.wordlist2.question7;
        user.WORDLIST_REC_8 = data.wordlist2.question8;
        user.WORDLIST_REC_9 = data.wordlist2.question9;
        user.WORDLIST_REC_10 = data.wordlist2.question10;
        user.WORDLIST_REC_11 = data.wordlist2.question11;
        user.WORDLIST_REC_12 = data.wordlist2.question12;
        user.WORDLIST_REC_13 = data.wordlist2.question13;
        user.WORDLIST_REC_14 = data.wordlist2.question14;
        user.WORDLIST_REC_15 = data.wordlist2.question15;
        user.WORDLIST_REC_16 = data.wordlist2.question16;
        user.WORDLIST_REC_17 = data.wordlist2.question17;
        user.WORDLIST_REC_18 = data.wordlist2.question18;
        user.WORDLIST_REC_19 = data.wordlist2.question19;
        user.WORDLIST_REC_20 = data.wordlist2.question20;
        user.WORDLIST_REC_21 = data.wordlist2.question21;
        user.WORDLIST_REC_22 = data.wordlist2.question22;
        user.WORDLIST_REC_23 = data.wordlist2.question23;
        user.WORDLIST_REC_24 = data.wordlist2.question24;
        user.WORDLIST_REC_25 = data.wordlist2.question25;
        user.WORDLIST_REC_26 = data.wordlist2.question26;
        user.WORDLIST_REC_27 = data.wordlist2.question27;
        user.WORDLIST_REC_28 = data.wordlist2.question28;
        user.WORDLIST_REC_29 = data.wordlist2.question29;
        user.WORDLIST_REC_30 = data.wordlist2.question30;
        user.WORDLIST_REC_31 = data.wordlist2.question31;
        user.WORDLIST_REC_32 = data.wordlist2.question32;
        user.WORDLIST_REC_33 = data.wordlist2.question33;
        user.WORDLIST_REC_34 = data.wordlist2.question34;
        user.WORDLIST_REC_35 = data.wordlist2.question35;
        user.WORDLIST_REC_36 = data.wordlist2.question36;
        user.WORDLIST_REC_37 = data.wordlist2.question37;
        user.WORDLIST_REC_38 = data.wordlist2.question38;
        user.WORDLIST_REC_39 = data.wordlist2.question39;
        user.WORDLIST_REC_40 = data.wordlist2.question40;
        user.WORDLIST_REC_41 = data.wordlist2.question41;
        user.WORDLIST_REC_42 = data.wordlist2.question42;
        user.WORDLIST_REC_43 = data.wordlist2.question43;
        user.WORDLIST_REC_44 = data.wordlist2.question44;
        user.WORDLIST_REC_hits = null;
        user.WORDLIST_REC_omissions = null;
        user.WORDLIST_REC_commissions = null;
    } else {
        user.WORDLIST_LT_file = null;
        user.WORDLIST_LT_1 = null;
        user.WORDLIST_LT_2 = null;
        user.WORDLIST_LT_3 = null;
        user.WORDLIST_LT_4 = null;
        user.WORDLIST_LT_5 = null;
        user.WORDLIST_LT_6 = null;
        user.WORDLIST_LT_7 = null;
        user.WORDLIST_LT_8 = null;
        user.WORDLIST_LT_9 = null;
        user.WORDLIST_LT_10 = null;
        user.WORDLIST_LT_11 = null;
        user.WORDLIST_LT_12 = null;
        user.WORDLIST_LT_13 = null;
        user.WORDLIST_LT_14 = null;
        user.WORDLIST_LT_15 = null;
        user.WORDLIST_LT_16 = null;
        user.WORDLIST_LT_total = null;
        user.WORDLIST_LT_intrusions = null;
        user.WORDLIST_LT_perseverations = null;
        user.WORDLIST_REC_1 = null;
        user.WORDLIST_REC_2 = null;
        user.WORDLIST_REC_3 = null;
        user.WORDLIST_REC_4 = null;
        user.WORDLIST_REC_5 = null;
        user.WORDLIST_REC_6 = null;
        user.WORDLIST_REC_7 = null;
        user.WORDLIST_REC_8 = null;
        user.WORDLIST_REC_9 = null;
        user.WORDLIST_REC_10 = null;
        user.WORDLIST_REC_11 = null;
        user.WORDLIST_REC_12 = null;
        user.WORDLIST_REC_13 = null;
        user.WORDLIST_REC_14 = null;
        user.WORDLIST_REC_15 = null;
        user.WORDLIST_REC_16 = null;
        user.WORDLIST_REC_17 = null;
        user.WORDLIST_REC_18 = null;
        user.WORDLIST_REC_19 = null;
        user.WORDLIST_REC_20 = null;
        user.WORDLIST_REC_21 = null;
        user.WORDLIST_REC_22 = null;
        user.WORDLIST_REC_23 = null;
        user.WORDLIST_REC_24 = null;
        user.WORDLIST_REC_25 = null;
        user.WORDLIST_REC_26 = null;
        user.WORDLIST_REC_27 = null;
        user.WORDLIST_REC_28 = null;
        user.WORDLIST_REC_29 = null;
        user.WORDLIST_REC_30 = null;
        user.WORDLIST_REC_31 = null;
        user.WORDLIST_REC_32 = null;
        user.WORDLIST_REC_33 = null;
        user.WORDLIST_REC_34 = null;
        user.WORDLIST_REC_35 = null;
        user.WORDLIST_REC_36 = null;
        user.WORDLIST_REC_37 = null;
        user.WORDLIST_REC_38 = null;
        user.WORDLIST_REC_39 = null;
        user.WORDLIST_REC_40 = null;
        user.WORDLIST_REC_41 = null;
        user.WORDLIST_REC_42 = null;
        user.WORDLIST_REC_43 = null;
        user.WORDLIST_REC_44 = null;
        user.WORDLIST_REC_hits = null;
        user.WORDLIST_REC_omissions = null;
        user.WORDLIST_REC_commissions = null;
    }
}
function csvStroop(user, data) {
    user.STROOP1_file = null;
    user.STROOP1_RT = null;
    user.STROOP1_errors = null;
    user.STROOP1_corrections = null;
    user.STROOP2_file = null;
    user.STROOP2_RT = null;
    user.STROOP2_errors = null;
    user.STROOP2_corrections = null;
    user.STROOP3_file = null;
    user.STROOP3_RT = null;
    user.STROOP3_errors = null;
    user.STROOP3_corrections = null;
    user.STROOP4_file = null;
    user.STROOP4_RT = null;
    user.STROOP4_errors = null;
    user.STROOP4_corrections = null;

    if (data.stroop != undefined) {
        if (data.stroop.audio1 != undefined) {
            user.STROOP1_file = url + "/static_data/" + data.stroop.audio1;
        }
        user.STROOP1_RT = null;
        user.STROOP1_errors = null;
        user.STROOP1_corrections = null;

        if (data.stroop.audio2 != undefined) {
            user.STROOP2_file = url + "/static_data/" + data.stroop.audio2;
        }
        user.STROOP2_RT = null;
        user.STROOP2_errors = null;
        user.STROOP2_corrections = null;
        if (data.stroop.audio3 != undefined) {
            user.STROOP3_file = url + "/static_data/" + data.stroop.audio3;
        }
        user.STROOP3_RT = null;
        user.STROOP3_errors = null;
        user.STROOP3_corrections = null;
        if (data.stroop.audio4 != undefined) {
            user.STROOP4_file = url + "/static_data/" + data.stroop.audio4;
        }
        user.STROOP4_RT = null;
        user.STROOP4_errors = null;
        user.STROOP4_corrections = null;
    }
}
function csvCancellation(user, data) {
    if (data.cancellation != undefined) {
        user.CANCELLATION1_hits = data.cancellation.hits;
        user.CANCELLATION1_omissions = data.cancellation.omissions;
        user.CANCELLATION1_commissions = data.cancellation.commissions;
        user.CANCELLATION1_backward = data.cancellation.backward;
        user.CANCELLATION2_hits = data.cancellation.hits;
        user.CANCELLATION2_omissions = data.cancellation.omissions;
        user.CANCELLATION2_commissions = data.cancellation.commissions;
        user.CANCELLATION2_backward = data.cancellation.backward;
        user.CANCELLATION3_hits = data.cancellation.hits;
        user.CANCELLATION3_omissions = data.cancellation.omissions;
        user.CANCELLATION3_commissions = data.cancellation.commissions;
        user.CANCELLATION3_backward = data.cancellation.backward;
        user.CANCELLATION4_hits = data.cancellation.hits;
        user.CANCELLATION4_omissions = data.cancellation.omissions;
        user.CANCELLATION4_commissions = data.cancellation.commissions;
        user.CANCELLATION4_backward = data.cancellation.backward;
        user.CANCELLATION5_hits = data.cancellation.hits;
        user.CANCELLATION5_omissions = data.cancellation.omissions;
        user.CANCELLATION5_commissions = data.cancellation.commissions;
        user.CANCELLATION5_backward = data.cancellation.backward;
        user.CANCELLATION6_hits = data.cancellation.hits;
        user.CANCELLATION6_omissions = data.cancellation.omissions;
        user.CANCELLATION6_commissions = data.cancellation.commissions;
        user.CANCELLATION6_backward = data.cancellation.backward;
        user.CANCELLATION7_hits = data.cancellation.hits;
        user.CANCELLATION7_omissions = data.cancellation.omissions;
        user.CANCELLATION7_commissions = data.cancellation.commissions;
        user.CANCELLATION7_backward = data.cancellation.backward;
        user.CANCELLATION8_hits = data.cancellation.hits;
        user.CANCELLATION8_omissions = data.cancellation.omissions;
        user.CANCELLATION8_commissions = data.cancellation.commissions;
        user.CANCELLATION8_backward = data.cancellation.backward;
        user.CANCELLATION9_hits = data.cancellation.hits;
        user.CANCELLATION9_omissions = data.cancellation.omissions;
        user.CANCELLATION9_commissions = data.cancellation.commissions;
        user.CANCELLATION9_backward = data.cancellation.backward;
        user.CANCELLATION10_hits = data.cancellation.hits;
        user.CANCELLATION10_omissions = data.cancellation.omissions;
        user.CANCELLATION10_commissions = data.cancellation.commissions;
        user.CANCELLATION10_backward = data.cancellation.backward;
        user.CANCELLATION1_total_hits = data.cancellation.total_hits;
        user.CANCELLATION1_total_omissions = data.cancellation.total_omissions;
        user.CANCELLATION1_total_commissions = data.cancellation.total_commissions;
        user.CANCELLATION1_total_backward = data.cancellation.total_backward;
    } else {
        user.CANCELLATION1_hits = null;
        user.CANCELLATION1_omissions = null;
        user.CANCELLATION1_commissions = null;
        user.CANCELLATION1_backward = null;
        user.CANCELLATION2_hits = null;
        user.CANCELLATION2_omissions = null;
        user.CANCELLATION2_commissions = null;
        user.CANCELLATION2_backward = null;
        user.CANCELLATION3_hits = null;
        user.CANCELLATION3_omissions = null;
        user.CANCELLATION3_commissions = null;
        user.CANCELLATION3_backward = null;
        user.CANCELLATION4_hits = null;
        user.CANCELLATION4_omissions = null;
        user.CANCELLATION4_commissions = null;
        user.CANCELLATION4_backward = null;
        user.CANCELLATION5_hits = null;
        user.CANCELLATION5_omissions = null;
        user.CANCELLATION5_commissions = null;
        user.CANCELLATION5_backward = null;
        user.CANCELLATION6_hits = null;
        user.CANCELLATION6_omissions = null;
        user.CANCELLATION6_commissions = null;
        user.CANCELLATION6_backward = null;
        user.CANCELLATION7_hits = null;
        user.CANCELLATION7_omissions = null;
        user.CANCELLATION7_commissions = null;
        user.CANCELLATION7_backward = null;
        user.CANCELLATION8_hits = null;
        user.CANCELLATION8_omissions = null;
        user.CANCELLATION8_commissions = null;
        user.CANCELLATION8_backward = null;
        user.CANCELLATION9_hits = null;
        user.CANCELLATION9_omissions = null;
        user.CANCELLATION9_commissions = null;
        user.CANCELLATION9_backward = null;
        user.CANCELLATION10_hits = null;
        user.CANCELLATION10_omissions = null;
        user.CANCELLATION10_commissions = null;
        user.CANCELLATION10_backward = null;
        user.CANCELLATION1_total_hits = null;
        user.CANCELLATION1_total_omissions = null;
        user.CANCELLATION1_total_commissions = null;
        user.CANCELLATION1_total_backward = null;
    }
}
function csvNaming(user, data) {
    if (data.namingTask != undefined) {
        user.NAMING1_file = url + "/static_data/" + data.namingTask.stimuli1;
        user.NAMING1_correct = null;
        user.NAMING2_file = url + "/static_data/" + data.namingTask.stimuli2;
        user.NAMING2_correct = null;
        user.NAMING3_file = url + "/static_data/" + data.namingTask.stimuli3;
        user.NAMING3_correct = null;
        user.NAMING4_file = url + "/static_data/" + data.namingTask.stimuli4;
        user.NAMING4_correct = null;
        user.NAMING5_file = url + "/static_data/" + data.namingTask.stimuli5;
        user.NAMING5_correct = null;
        user.NAMING6_file = url + "/static_data/" + data.namingTask.stimuli6;
        user.NAMING6_correct = null;
        user.NAMING7_file = url + "/static_data/" + data.namingTask.stimuli7;
        user.NAMING7_correct = null;
        user.NAMING8_file = url + "/static_data/" + data.namingTask.stimuli8;
        user.NAMING8_correct = null;
        user.NAMING9_file = url + "/static_data/" + data.namingTask.stimuli9;
        user.NAMING9_correct = null;
        user.NAMING10_file = url + "/static_data/" + data.namingTask.stimuli10;
        user.NAMING10_correct = null;
        user.NAMING11_file = url + "/static_data/" + data.namingTask.stimuli11;
        user.NAMING11_correct = null;
        user.NAMING12_file = url + "/static_data/" + data.namingTask.stimuli12;
        user.NAMING12_correct = null;
        user.NAMING13_file = url + "/static_data/" + data.namingTask.stimuli13;
        user.NAMING13_correct = null;
        user.NAMING14_file = url + "/static_data/" + data.namingTask.stimuli14;
        user.NAMING14_correct = null;
        user.NAMING15_file = url + "/static_data/" + data.namingTask.stimuli15;
        user.NAMING15_correct = null;
        user.NAMING16_file = url + "/static_data/" + data.namingTask.stimuli16;
        user.NAMING16_correct = null;
        user.NAMING17_file = url + "/static_data/" + data.namingTask.stimuli17;
        user.NAMING17_correct = null;
        user.NAMING18_file = url + "/static_data/" + data.namingTask.stimuli18;
        user.NAMING18_correct = null;
        user.NAMING19_file = url + "/static_data/" + data.namingTask.stimuli19;
        user.NAMING19_correct = null;
        user.NAMING20_file = url + "/static_data/" + data.namingTask.stimuli20;
        user.NAMING20_correct = null;
        user.NAMING1_total = null;
    } else {
        user.NAMING1_file = null;
        user.NAMING1_correct = null;
        user.NAMING2_file = null;
        user.NAMING2_correct = null;
        user.NAMING3_file = null;
        user.NAMING3_correct = null;
        user.NAMING4_file = null;
        user.NAMING4_correct = null;
        user.NAMING5_file = null;
        user.NAMING5_correct = null;
        user.NAMING6_file = null;
        user.NAMING6_correct = null;
        user.NAMING7_file = null;
        user.NAMING7_correct = null;
        user.NAMING8_file = null;
        user.NAMING8_correct = null;
        user.NAMING9_file = null;
        user.NAMING9_correct = null;
        user.NAMING10_file = null;
        user.NAMING10_correct = null;
        user.NAMING11_file = null;
        user.NAMING11_correct = null;
        user.NAMING12_file = null;
        user.NAMING12_correct = null;
        user.NAMING13_file = null;
        user.NAMING13_correct = null;
        user.NAMING14_file = null;
        user.NAMING14_correct = null;
        user.NAMING15_file = null;
        user.NAMING15_correct = null;
        user.NAMING16_file = null;
        user.NAMING16_correct = null;
        user.NAMING17_file = null;
        user.NAMING17_correct = null;
        user.NAMING18_file = null;
        user.NAMING18_correct = null;
        user.NAMING19_file = null;
        user.NAMING19_correct = null;
        user.NAMING20_file = null;
        user.NAMING20_correct = null;
        user.NAMING1_total = null;
    }
}
function csvComprehension(user, data) {
    var answers = [[
        "1a", "1d", "3e", "3d"
    ], [
        "2e", "3a", "3b", "3d"
    ]];

    if (data.comprehension != undefined) {
        user.COMPREHENSION_1_RT = data.comprehension.reaction1;
        user.COMPREHENSION_1 = data.comprehension.question1;
        user.COMPREHENSION_2_RT = data.comprehension.reaction2;
        user.COMPREHENSION_2 = data.comprehension.question2;
        user.COMPREHENSION_3_RT = data.comprehension.reaction3;
        user.COMPREHENSION_3 = data.comprehension.question3;
        user.COMPREHENSION_4_RT = data.comprehension.reaction4;
        user.COMPREHENSION_4 = data.comprehension.question4;
        user.COMPREHENSION_5_RT = data.comprehension.reaction5;
        user.COMPREHENSION_5 = data.comprehension.question5;
        user.COMPREHENSION_6_RT = data.comprehension.reaction6;
        user.COMPREHENSION_6 = data.comprehension.question6;
        user.COMPREHENSION_7_RT = data.comprehension.reaction7;
        user.COMPREHENSION_7 = data.comprehension.question7;
        user.COMPREHENSION_8_RT = data.comprehension.reaction8;
        user.COMPREHENSION_8 = data.comprehension.question8;
        user.COMPREHENSION_9_RT = data.comprehension.reaction9;
        user.COMPREHENSION_9 = data.comprehension.question9;
        user.COMPREHENSION_10_RT = data.comprehension.reaction10;
        user.COMPREHENSION_10 = data.comprehension.question10;
        user.COMPREHENSION_11_RT = data.comprehension.reaction11;
        user.COMPREHENSION_11 = data.comprehension.question11;
        user.COMPREHENSION_12_RT = data.comprehension.reaction12;
        user.COMPREHENSION_12 = data.comprehension.question12;
        user.COMPREHENSION_13_RT = data.comprehension.reaction13;
        user.COMPREHENSION_13 = data.comprehension.question13;
        user.COMPREHENSION_14_RT = data.comprehension.reaction14;
        user.COMPREHENSION_14 = data.comprehension.question14;
        user.COMPREHENSION_15_RT = data.comprehension.reaction15;
        user.COMPREHENSION_15 = data.comprehension.question15;
        user.COMPREHENSION_16_RT = data.comprehension.reaction16;
        user.COMPREHENSION_16 = data.comprehension.question16;
        user.COMPREHENSION_17_RT = data.comprehension.reaction17;
        user.COMPREHENSION_17 = data.comprehension.question17;
        user.COMPREHENSION_18_RT = data.comprehension.reaction18;
        user.COMPREHENSION_18 = data.comprehension.question18;
        user.COMPREHENSION_19_RT = data.comprehension.reaction19;
        user.COMPREHENSION_19 = data.comprehension.question19;
        user.COMPREHENSION_20_RT = data.comprehension.reaction20;
        user.COMPREHENSION_20 = data.comprehension.question20;
        user.COMPREHENSION_21_RT = data.comprehension.reaction21;
        user.COMPREHENSION_21 = data.comprehension.question21;
        user.COMPREHENSION_AVG_RT = data.comprehension.avg_reaction;
        user.COMPREHENSION_total = data.comprehension.total;
    } else {
        user.COMPREHENSION_1_RT = null;
        user.COMPREHENSION_1 = null;
        user.COMPREHENSION_2_RT = null;
        user.COMPREHENSION_2 = null;
        user.COMPREHENSION_3_RT = null;
        user.COMPREHENSION_3 = null;
        user.COMPREHENSION_4_RT = null;
        user.COMPREHENSION_4 = null;
        user.COMPREHENSION_5_RT = null;
        user.COMPREHENSION_5 = null;
        user.COMPREHENSION_6_RT = null;
        user.COMPREHENSION_6 = null;
        user.COMPREHENSION_7_RT = null;
        user.COMPREHENSION_7 = null;
        user.COMPREHENSION_8_RT = null;
        user.COMPREHENSION_8 = null;
        user.COMPREHENSION_9_RT = null;
        user.COMPREHENSION_9 = null;
        user.COMPREHENSION_10_RT = null;
        user.COMPREHENSION_10 = null;
        user.COMPREHENSION_11_RT = null;
        user.COMPREHENSION_11 = null;
        user.COMPREHENSION_12_RT = null;
        user.COMPREHENSION_12 = null;
        user.COMPREHENSION_13_RT = null;
        user.COMPREHENSION_13 = null;
        user.COMPREHENSION_14_RT = null;
        user.COMPREHENSION_14 = null;
        user.COMPREHENSION_15_RT = null;
        user.COMPREHENSION_15 = null;
        user.COMPREHENSION_16_RT = null;
        user.COMPREHENSION_16 = null;
        user.COMPREHENSION_17_RT = null;
        user.COMPREHENSION_17 = null;
        user.COMPREHENSION_18_RT = null;
        user.COMPREHENSION_18 = null;
        user.COMPREHENSION_19_RT = null;
        user.COMPREHENSION_19 = null;
        user.COMPREHENSION_20_RT = null;
        user.COMPREHENSION_20 = null;
        user.COMPREHENSION_21_RT = null;
        user.COMPREHENSION_21 = null;
        user.COMPREHENSION_AVG_RT = null;
        user.COMPREHENSION_total = null;
    }
}
function csvEyes(user, data) {
    if (data.eye_test != undefined) {
        user.EYESPractice_answer = null;
        user.EYESPractice_correct = "Panicked";
        user.EYES1_answer = data.eye_test.question1;
        user.EYES1_correct = "Playful";
        user.EYES2_answer = data.eye_test.question2;
        user.EYES2_correct = "Upset";
        user.EYES3_answer = data.eye_test.question3;
        user.EYES3_correct = "Desire";
        user.EYES4_answer = data.eye_test.question4;
        user.EYES4_correct = "Insisting";
        user.EYES5_answer = data.eye_test.question5;
        user.EYES5_correct = "Worried";
        user.EYES6_answer = data.eye_test.question6;
        user.EYES6_correct = "Fantasizing";
        user.EYES7_answer = data.eye_test.question7;
        user.EYES7_correct = "Uneasy";
        user.EYES8_answer = data.eye_test.question8;
        user.EYES8_correct = "Despondent";
        user.EYES9_answer = data.eye_test.question9;
        user.EYES9_correct = "Preoccupied";
        user.EYES10_answer = data.eye_test.question10;
        user.EYES10_correct = "Cautious";
        user.EYES11_answer = data.eye_test.question11;
        user.EYES11_correct = "Regretful";
        user.EYES12_answer = data.eye_test.question12;
        user.EYES12_correct = "Skeptical";
        user.EYES13_answer = data.eye_test.question13;
        user.EYES13_correct = "Anticipating";
        user.EYES14_answer = data.eye_test.question14;
        user.EYES14_correct = "Accusing";
        user.EYES15_answer = data.eye_test.question15;
        user.EYES15_correct = "Contemplative";
        user.EYES16_answer = data.eye_test.question16;
        user.EYES16_correct = "Thoughtful";
        user.EYES17_answer = data.eye_test.question17;
        user.EYES17_correct = "Doubtful";
        user.EYES18_answer = data.eye_test.question18;
        user.EYES18_correct = "Decisive";
        user.EYES19_answer = data.eye_test.question19;
        user.EYES19_correct = "Tentative";
        user.EYES20_answer = data.eye_test.question20;
        user.EYES20_correct = "Friendly";
        user.EYES21_answer = data.eye_test.question21;
        user.EYES21_correct = "Fantasizing";
        user.EYES22_answer = data.eye_test.question22;
        user.EYES22_correct = "Preoccupied";
        user.EYES23_answer = data.eye_test.question23;
        user.EYES23_correct = "Defiant";
        user.EYES24_answer = data.eye_test.question24;
        user.EYES24_correct = "Pensive";
        user.EYES25_answer = data.eye_test.question25;
        user.EYES25_correct = "Interested";
        user.EYES26_answer = data.eye_test.question26;
        user.EYES26_correct = "Hostile";
        user.EYES27_answer = data.eye_test.question27;
        user.EYES27_correct = "Cautious";
        user.EYES28_answer = data.eye_test.question28;
        user.EYES28_correct = "Interested";
        user.EYES29_answer = data.eye_test.question29;
        user.EYES29_correct = "Reflective";
        user.EYES30_answer = data.eye_test.question30;
        user.EYES30_correct = "Flirtatious";
        user.EYES31_answer = data.eye_test.question31;
        user.EYES31_correct = "Confident";
        user.EYES32_answer = data.eye_test.question32;
        user.EYES32_correct = "Serious";
        user.EYES33_answer = data.eye_test.question33;
        user.EYES33_correct = "Concerned";
        user.EYES34_answer = data.eye_test.question34;
        user.EYES34_correct = "Distrustful";
        user.EYES35_answer = data.eye_test.question35;
        user.EYES35_correct = "Nervous";
        user.EYES36_answer = data.eye_test.question36;
        user.EYES36_correct = "Suspicious";
        user.EYES_total = data.eye_test.total;
    } else {
        user.EYESPractice_answer = null;
        user.EYESPractice_correct = "panicked";
        user.EYES1_answer = null;
        user.EYES1_correct = "Playful";
        user.EYES2_answer = null;
        user.EYES2_correct = "Upset";
        user.EYES3_answer = null;
        user.EYES3_correct = "Desire";
        user.EYES4_answer = null;
        user.EYES4_correct = "Insisting";
        user.EYES5_answer = null;
        user.EYES5_correct = "Worried";
        user.EYES6_answer = null;
        user.EYES6_correct = "Fantasizing";
        user.EYES7_answer = null;
        user.EYES7_correct = "Uneasy";
        user.EYES8_answer = null;
        user.EYES8_correct = "Despondent";
        user.EYES9_answer = null;
        user.EYES9_correct = "Preoccupied";
        user.EYES10_answer = null;
        user.EYES10_correct = "Cautious";
        user.EYES11_answer = null;
        user.EYES11_correct = "Regretful";
        user.EYES12_answer = null;
        user.EYES12_correct = "Skeptical";
        user.EYES13_answer = null;
        user.EYES13_correct = "Anticipating";
        user.EYES14_answer = null;
        user.EYES14_correct = "Accusing";
        user.EYES15_answer = null;
        user.EYES15_correct = "Contemplative";
        user.EYES16_answer = null;
        user.EYES16_correct = "Thoughtful";
        user.EYES17_answer = null;
        user.EYES17_correct = "Doubtful";
        user.EYES18_answer = null;
        user.EYES18_correct = "Decisive";
        user.EYES19_answer = null;
        user.EYES19_correct = "Tentative";
        user.EYES20_answer = null;
        user.EYES20_correct = "Friendly";
        user.EYES21_answer = null;
        user.EYES21_correct = "Fantasizing";
        user.EYES22_answer = null;
        user.EYES22_correct = "Preoccupied";
        user.EYES23_answer = null;
        user.EYES23_correct = "Defiant";
        user.EYES24_answer = null;
        user.EYES24_correct = "Pensive";
        user.EYES25_answer = null;
        user.EYES25_correct = "Interested";
        user.EYES26_answer = null;
        user.EYES26_correct = "Hostile";
        user.EYES27_answer = null;
        user.EYES27_correct = "Cautious";
        user.EYES28_answer = null;
        user.EYES28_correct = "Interested";
        user.EYES29_answer = null;
        user.EYES29_correct = "Reflective";
        user.EYES30_answer = null;
        user.EYES30_correct = "Flirtatious";
        user.EYES31_answer = null;
        user.EYES31_correct = "Confident";
        user.EYES32_answer = null;
        user.EYES32_correct = "Serious";
        user.EYES33_answer = null;
        user.EYES33_correct = "Concerned";
        user.EYES34_answer = null;
        user.EYES34_correct = "Distrustful";
        user.EYES35_answer = null;
        user.EYES35_correct = "Nervous";
        user.EYES36_answer = null;
        user.EYES36_correct = "Suspicious";
        user.EYES_total = null;
    }
}

function _calculateAge(birthday) {
    var birthday = new Date(birthday);
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

function basic(id, data) {
    var dob = data.BirthdateYear + '-' + data.BirthdateMonth + '-' + data.BirthdateDay;
    var gender = data.gender;

    connection.query('CALL update_participant("' + id + '", "' + dob + '", "' + gender + '")', function(err, result) {
        if (err) throw err;
    });
}
function hand_dominate(id, data) {
    var writing = data.writinghand == undefined ? '': data.writinghand;
    var drawing = data.drawinghand == undefined ? '': data.drawinghand;
    var ballThrowing = data.throwinghand == undefined ? '': data.throwinghand;
    var scissors = data.scissorshand == undefined ? '': data.scissorshand;
    var toothbrush = data.toothbrushhand == undefined ? '': data.toothbrushhand;
    var knife = data.knifehand == undefined ? '': data.knifehand;
    var spoon = data.spoonhand == undefined ? '': data.spoonhand;
    var broom = data.broomhand == undefined ? '': data.broomhand;
    var smatch = data.matchhand == undefined ? '': data.matchhand;
    var lid = data.openinghand == undefined ? '': data.openinghand;

    connection.query('CALL insert_hand_dominate("' + id + '", "' + writing + '", "' + drawing + '", "' + ballThrowing + '", "' + scissors + '", "' + toothbrush + '", "' + knife + '", "' + spoon + '", "' + broom + '", "' + smatch + '", "' + lid + '")', function(err, result) {
        if (err) throw err;
    });
}
function race(id, data) {
    var otherRace = data.otherRace;
    var race = data.race == 'Other' ? otherRace : data.race == undefined ? '': data.race;
    var ethnicity = data.ethnicity == undefined ? []: data.ethnicity;

    connection.query('CALL insert_race("' + id + '", "' + race + '")', function(err, result) {
        if (err) throw err;
    });

    if (Array.isArray(ethnicity)) {
        for (var i = 0; i < ethnicity.length; i++) {
            connection.query('CALL insert_ethnicity("' + id + '", "' + ethnicity[i] + '")', function (err, result) {
                if (err) throw err;
            });
        }
    } else {
        connection.query('CALL insert_ethnicity("' + id + '", "' + ethnicity + '")', function (err, result) {
            if (err) throw err;
        });
    }
}
function marital_status(id, data) {
    var mstatus = data.mstatus == undefined ? '': data.mstatus;
    var marriedY = data.married_years == undefined ? -1: data.married_years;
    var marriedM = data.married_months == undefined ? -1: data.married_months;
    var partnerY = data.partner_years == undefined ? -1: data.partner_years;
    var partnerM = data.partner_months == undefined ? -1: data.partner_months;
    var widowY = data.widow_years == undefined ? -1: data.widow_years;
    var widowM = data.widow_months == undefined ? -1: data.widow_months;
    var separatedY = data.separated_years == undefined ? -1: data.separated_years;
    var separatedM = data.separated_months == undefined ? -1: data.separated_months;
    var childrenAge = data.cage == undefined ? []: data.cage;
    var childrenGender = data.cgender;

    connection.query('CALL insert_marital_status("' + id + '", "' + mstatus + '", "' + marriedY + '", "' + marriedM + '", "' + partnerY + '", "' + partnerM + '", "' + widowY + '", "' + widowM + '", "' + separatedY + '", "' + separatedM + '")', function(err, result) {
        if (err) throw err;
    });

    for (var i = 0; i < childrenAge.length; i++) {
        connection.query('CALL insert_children("' + id + '", "' + childrenAge[i] + '", "' + childrenGender[i] + '")', function (err, result) {
            if (err) throw err;
        });
    }
}
function residence(id, data) {
    var city = data.city == undefined ? '': data.city;
    var state = data.state == undefined ? '': data.state;
    var country = data.country == undefined ? '': data.country;
    var inhabitants = data.inhabitants == undefined ? '': data.inhabitants;
    var geography = data.geography == undefined ? '': data.geography;

    connection.query('CALL insert_residence("' + id + '", "' + city + '", "' + state + '", "' + country + '", "' + inhabitants + '", "' + geography + '")', function(err, result) {
        if (err) throw err;
    });
}
function occupation(id, data) {
    var daily_activities = data.daily_activities == undefined ? '': data.daily_activities;
    var daily_activities_specify = data.daily_activities_specify == undefined ? '': data.daily_activities_specify;
    var unemployedY = data.daily_activities == undefined ? -1: data.unemployed_years;
    var unemployedM = data.daily_activities == undefined ? -1: data.unemployed_months;
    var job_type = data.job_type == undefined ? '': data.job_type;
    var current_position = data.current_position == undefined ? '': data.current_position;
    var otherOccupation = data.other_current_position_desc;
    var current_position_desc = data.current_position_desc == 'other' ? otherOccupation : data.current_position_desc == undefined ? '': data.current_position_desc;
    var condition_desc = data.condition_desc == undefined ? '': data.condition_desc;
    var other_current_position_desc = data.other_current_position_desc == undefined ? '': data.other_current_position_desc;
    var participate_descisions = data.participate_descisions == undefined ? '': data.participate_descisions;
    var supervise_others = data.supervise_others == undefined ? '': data.supervise_others;

    connection.query('CALL insert_occupation("' + id + '", "' + daily_activities + '", "' + daily_activities_specify + '", "' + unemployedY + '", "' + unemployedM + '", "' + job_type + '", "' + current_position + '", "' + current_position_desc + '", "' + condition_desc + '", "' + other_current_position_desc + '", "' + participate_descisions + '", "' + supervise_others + '")', function(err, result) {
        if (err) throw err;
    });
}
function income(id, data) {
    var financially_dependent = data.financially_dependent == undefined ? '': data.financially_dependent;
    var earnings = data.earnings == undefined ? '': data.earnings;
    var people_in_household = data.people_in_household == undefined ? -1: data.people_in_household;
    var children_in_household = data.children_in_household == undefined ? -1: data.children_in_household;
    var adults_in_household = data.adults_in_household == undefined ? -1: data.adults_in_household;
    var adults_income_in_household = data.adults_income_in_household == undefined ? -1: data.adults_income_in_household;
    var otherIncome = data.other_home_status == undefined ? '' : data.other_home_status;
    var home_status = data.home_status == data.home_status == undefined ? '': data.home_status;
    var total_income = data.total_income == undefined ? '': data.total_income;

    connection.query('CALL insert_income("' + id + '", "' + financially_dependent + '", "' + earnings + '", "' + people_in_household + '", "' + children_in_household + '", "' + adults_in_household + '", "' + adults_income_in_household + '", "' + home_status + '", "' + otherIncome + '", "' + total_income + '")', function(err, result) {
        if (err) throw err;
    });
}
function social_status(id, data) {
    var community_ladder = data.communityLadder == undefined ? '': data.communityLadder;
    var country_ladder = data.countryLadder == undefined ? '': data.countryLadder;

    connection.query('CALL insert_social_status("' + id + '", "' + community_ladder + '", "' + country_ladder + '")', function(err, result) {
        if (err) throw err;
    });
}
function education(id, data) {
    var years_study = data.years_study == undefined ? -1: data.years_study;
    var age_study = data.age_study == undefined ? -1: data.age_study;
    var not_finished_school = data.not_finished_school == undefined ? '': data.not_finished_school;
    var highest_grade = data.highest_grade == undefined ? '': data.highest_grade;
    var highest_degree = data.highest_degree == undefined ? '': data.highest_degree;
    var other_highest_degree = data.other_highest_degree == undefined ? '': data.other_highest_degree;
    var computer_usage = data.computer_usage == undefined ? '': data.computer_usage;
    var internet_usage = data.internet_usage == undefined ? '': data.internet_usage;

    connection.query('CALL insert_education("' + id + '", "' + years_study + '", "' + age_study + '", "' + not_finished_school + '", "' + highest_grade + '", "' + highest_degree + '", "' + other_highest_degree + '" , "' + computer_usage + '", "' + internet_usage + '")', function(err, result) {
        if (err) throw err;
    });
}
function religion(id, data) {
    var beliefs = data.beliefs == undefined ? '': data.beliefs;
    var otherReligion = data.other_religion == undefined ? '': data.other_religion;
    var religion = data.religion == 'other' ? otherReligion : data.religion == undefined ? '': data.religion;
    var practice_month = data.practice_month == undefined ? -1: data.practice_month;

    console.log(data.practice_month);
    console.log(practice_month);
    
    connection.query('CALL insert_religion("' + id + '", "' + beliefs + '", "' + religion + '", ' + practice_month + ')', function(err, result) {
        if (err) throw err;
    });
}
function gender_role(id, data) {
    var housekeeping_as_child = data.housekeeping_as_child == undefined ? '': data.housekeeping_as_child;
    var housekeeping_as_current = data.housekeeping_as_current == undefined ? '': data.housekeeping_as_current;
    var caretaker_as_child = data.caretaker_as_child == undefined ? '': data.caretaker_as_child;
    var caretaker = data.caretaker == undefined ? '': data.caretaker;
    var child_upbringing = data.child_upbringing == undefined ? '': data.child_upbringing;
    var important_decisions_current = data.important_decisions_current == undefined ? '': data.important_decisions_current;

    connection.query('CALL insert_gender_role("' + id + '", "' + housekeeping_as_child + '", "' + housekeeping_as_current + '",  "' + caretaker_as_child + '", "' + caretaker + '", "' + child_upbringing + '", "' + important_decisions_current + '")', function(err, result) {
        if (err) throw err;
    });
}
function cultural_values(id, data) {
    var personal_space = data.personal_space == undefined ? '': data.personal_space;
    var capabilities = data.capabilities == undefined ? '': data.capabilities;
    var cvunique = data.unique == undefined ? '': data.unique;
    var law_of_nature = data.law_of_nature == undefined ? '': data.law_of_nature;
    var competition = data.competition == undefined ? '': data.competition;
    var sacrifice_activity = data.sacrifice_activity == undefined ? '': data.sacrifice_activity;
    var detest = data.detest == undefined ? '': data.detest;
    var sacrifice_interest = data.sacrifice_interest == undefined ? '': data.sacrifice_interest;
    var fast_task = data.fast_task == undefined ? '': data.fast_task;
    var slow_task = data.slow_task == undefined ? '': data.slow_task;

    connection.query('CALL insert_cultural_values("' + id + '", "' + personal_space + '", "' + capabilities + '", "' + cvunique + '", "' + law_of_nature + '", "' + competition + '", "' + sacrifice_activity + '", "' + detest + '", "' + sacrifice_interest + '", "' + fast_task + '", "' + slow_task + '")', function(err, result) {
        if (err) throw err;
    });
}
function social_support(id, data) {
    var count_on = data.count_on == undefined ? '': data.count_on;
    var count_on_who = data.count_on_who == undefined ? '': data.count_on_who;
    var rely_on = data.rely_on == undefined ? '': data.rely_on;
    var relies_on = data.relies_on == undefined ? '': data.relies_on;
    var enjoy_on = data.enjoy_on == undefined ? '': data.enjoy_on;
    var enjoy_same = data.enjoy_same == undefined ? '': data.enjoy_same;
    var no_help = data.no_help == undefined ? '': data.no_help;
    var emotional_on = data.emotional_on == undefined ? '': data.emotional_on;
    var emotional_link = data.emotional_link == undefined ? '': data.emotional_link;
    var comfortable = data.comfortable == undefined ? '': data.comfortable;

    connection.query('CALL insert_social_support("' + id + '", "' + count_on + '", "' + count_on_who + '", "' + rely_on + '", "' + relies_on + '", "' + enjoy_on + '", "' + enjoy_same + '", "' + no_help + '", "' + emotional_on + '", "' + emotional_link + '", "' + comfortable + '")', function(err, result) {
        if (err) throw err;
    });
}
function psychological_testing(id, data) {
    var administered_psychological_test = data.administered_psychological_test == undefined ? '': data.administered_psychological_test;
    var timed_psychological_test = data.timed_psychological_test == undefined ? '': data.timed_psychological_test;
    var comfortable_psychological_test = data.comfortable_psychological_test == undefined ? '': data.comfortable_psychological_test;

    connection.query('CALL insert_psychological_testing("' + id + '", "' + administered_psychological_test + '", "' + timed_psychological_test + '", "' + comfortable_psychological_test + '")', function(err, result) {
        if (err) throw err;
    });
}
function immigrants(id, data) {
    var immigrant_born = data.immigrant_born == undefined ? '': data.immigrant_born;
    var immigrant_town_size = data.immigrant_town_size == undefined ? '': data.immigrant_town_size;
    var immigrant_live_place = data.immigrant_live_place == undefined ? '': data.immigrant_live_place;
    var immigrant_nationality = data.immigrant_nationality == undefined ? '': data.immigrant_nationality;
    var immigrants_move_years = data.immigrants_move_years == undefined ? -1: data.immigrants_move_years;
    var immigrants_move_months = data.immigrants_move_months == undefined ? -1: data.immigrants_move_months;
    var imm_daily_activities = data.imm_daily_activities == undefined ? '': data.imm_daily_activities;
    var immigrant_job_type = data.immigrant_job_type == undefined ? '': data.immigrant_job_type;
    var immigrant_current_position = data.immigrant_current_position == undefined ? '': data.immigrant_current_position;
    var otherImmigrant_other_current_position_desc = data.immigrant_other_current_position_desc;
    var immigrant_current_position_desc = data.immigrant_current_position_desc == 'other' ? otherImmigrant_other_current_position_desc :  data.immigrant_current_position_desc == undefined ? '': data.immigrant_current_position_desc;
    var immigrant_condition_desc = data.immigrant_condition_desc == undefined ? '': data.immigrant_condition_desc;
    var immigrant_participate_descisions = data.immigrant_participate_descisions == undefined ? '': data.immigrant_participate_descisions;
    var immigrant_supervise_others = data.immigrant_supervise_others == undefined ? '': data.immigrant_supervise_others;

    connection.query('CALL insert_immigrants("' + id + '", "' + immigrant_born + '", "' + immigrant_town_size + '", "' + immigrant_live_place + '", "' + immigrant_nationality + '", "' + immigrants_move_years + '", "' + immigrants_move_months + '", "' + imm_daily_activities + '", "' + immigrant_job_type + '", "' + immigrant_current_position + '", "' + immigrant_current_position_desc + '", "' + immigrant_condition_desc + '", "' + immigrant_participate_descisions + '", "' + immigrant_supervise_others + '")', function(err, result) {
        if (err) throw err;
    });
}
function acculturation(id, data) {
    var myselfBeingAmerican = data.myselfBeingAmerican == undefined ? '': data.myselfBeingAmerican;
    var feelingGoodAmerican = data.feelingGoodAmerican == undefined ? '': data.feelingGoodAmerican;
    var americanImportant = data.americanImportant == undefined ? '': data.americanImportant;
    var feelAmericanCulture = data.feelAmericanCulture == undefined ? '': data.feelAmericanCulture;
    var strongBeingAmerican = data.strongBeingAmerican == undefined ? '': data.strongBeingAmerican;
    var proudAmerican = data.proudAmerican == undefined ? '': data.proudAmerican;
    var myCultureBeing = data.myCultureBeing == undefined ? '': data.myCultureBeing;
    var myCultureBeingGood = data.myCultureBeingGood == undefined ? '': data.myCultureBeingGood;
    var myCultureImportInLife = data.myCultureImportInLife == undefined ? '': data.myCultureImportInLife;
    var partOfCulture = data.partOfCulture == undefined ? '': data.partOfCulture;
    var beingOfCulture = data.beingOfCulture == undefined ? '': data.beingOfCulture;
    var beingOfCultureProud = data.beingOfCultureProud == undefined ? '': data.beingOfCultureProud;
    var englishschool = data.englishschool == undefined ? '': data.englishschool;
    var englishfriends = data.feelingGoodAmerican == undefined ? '': data.feelingGoodAmerican;
    var englishphone = data.englishphone == undefined ? '': data.englishphone;
    var englishstranger = data.feelingGoodAmerican == undefined ? '': data.feelingGoodAmerican;
    var englishgeneral = data.englishgeneral == undefined ? '': data.englishgeneral;
    var englishtv = data.englishtv == undefined ? '': data.englishtv;
    var englishnewspaper = data.englishnewspaper == undefined ? '': data.englishnewspaper;
    var englishsongs = data.englishsongs == undefined ? '': data.englishsongs;
    var englishugeneral = data.englishugeneral == undefined ? '': data.englishugeneral;
    var nativefamily = data.nativefamily == undefined ? '': data.nativefamily;
    var nativefriends = data.nativefriends == undefined ? '': data.nativefriends;
    var nativephone = data.nativephone == undefined ? '': data.nativephone;
    var nativestrangers = data.nativestrangers == undefined ? '': data.nativestrangers;
    var nativegeneral = data.nativegeneral == undefined ? '': data.nativegeneral;
    var nativetv = data.nativetv == undefined ? '': data.nativetv;
    var nativenewspaper = data.nativenewspaper == undefined ? '': data.nativenewspaper;
    var nativesongs = data.nativesongs == undefined ? '': data.nativesongs;
    var nativeugeneral = data.nativeugeneral == undefined ? '': data.nativeugeneral;
    var knowAmericanHeroes = data.knowAmericanHeroes == undefined ? '': data.knowAmericanHeroes;
    var knowAmericantv = data.knowAmericantv == undefined ? '': data.knowAmericantv;
    var knowAmericanNewspaper = data.knowAmericanNewspaper == undefined ? '': data.knowAmericanNewspaper;
    var knowAmericanActor = data.knowAmericanActor == undefined ? '': data.knowAmericanActor;
    var knowAmericanHistory = data.knowAmericanHistory == undefined ? '': data.knowAmericanHistory;
    var knowAmericanLeader = data.knowAmericanLeader == undefined ? '': data.knowAmericanLeader;
    var knowNativeHeroes = data.knowNativeHeroes == undefined ? '': data.knowNativeHeroes;
    var knowNativetv = data.knowNativetv == undefined ? '': data.knowNativetv;
    var knowNativeNewspaper = data.knowNativeNewspaper == undefined ? '': data.knowNativeNewspaper;
    var knowNativeActor = data.knowNativeActor == undefined ? '': data.knowNativeActor;
    var knowNativeHistory = data.knowNativeHistory == undefined ? '': data.knowNativeHistory;
    var knowNativeLeader = data.knowNativeLeader == undefined ? '': data.knowNativeLeader;

    connection.query('CALL insert_acculturation("' + id + '", "' +
        myselfBeingAmerican + '", "' +
        feelingGoodAmerican + '", "' +
        americanImportant + '", "' +
        feelAmericanCulture + '", "' +
        strongBeingAmerican + '", "' +
        proudAmerican + '", "' +
        myCultureBeing + '", "' +
        myCultureBeingGood + '", "' +
        myCultureImportInLife + '", "' +
        partOfCulture + '", "' +
        beingOfCulture + '", "' +
        beingOfCultureProud + '", "' +
        englishschool + '", "' +
        englishfriends + '", "' +
        englishphone + '", "' +
        englishstranger + '", "' +
        englishgeneral + '", "' +
        englishtv + '", "' +
        englishnewspaper + '", "' +
        englishsongs + '", "' +
        englishugeneral + '", "' +
        nativefamily + '", "' +
        nativefriends + '", "' +
        nativephone + '", "' +
        nativestrangers + '", "' +
        nativegeneral + '", "' +
        nativetv + '", "' +
        nativenewspaper + '", "' +
        nativesongs + '", "' +
        nativeugeneral + '", "' +
        knowAmericanHeroes + '", "' +
        knowAmericantv + '", "' +
        knowAmericanNewspaper + '", "' +
        knowAmericanActor + '", "' +
        knowAmericanHistory + '", "' +
        knowAmericanLeader + '", "' +
        knowNativeHeroes + '", "' +
        knowNativetv + '", "' +
        knowNativeNewspaper + '", "' +
        knowNativeActor + '", "' +
        knowNativeHistory + '", "' +
        knowNativeLeader + '")', function(err, result) {
        if (err) throw err;
    });
}


// Test
function moca(data, res, req) {
    var _id = req.params.id;
    var year = data.MoCA_MMSE_Ans1;
    var month = data.MoCA_MMSE_Ans2;
    var date = data.MoCA_MMSE_Ans3;
    var day = data.MoCA_MMSE_Ans4;
    var hour = data.MoCA_MMSE_Ans5H;
    var minute = data.MoCA_MMSE_Ans5M;
    var ampm = data.MoCA_MMSE_Ans5AMPM;
    var country = data.MoCA_MMSE_Ans6;
    var county = data.MoCA_MMSE_Ans7;
    var city = data.MoCA_MMSE_Ans8;
    var site = data.MoCA_MMSE_Ans9;
    var floor = data.MoCA_MMSE_Ans10;

    console.log(data);

    connection.query('CALL get_participant("' + _id + '")', function (err, result) {
        if (err) throw err;

        var participant = result[0][0];

        connection.query('CALL insert_MoCAMMSE("' + participant._id + '", "' + year + '", "' + month + '", "' + date + '", "' + day + '", "' + hour + '", "' + minute + '", "' + ampm + '", "' + country + '", "' + county + '", "' + city + '", "' + site + '", "' + floor + '")', function (err, result) {
            if (err) throw err;

            res.send("Record Updated");
        });
    });
}
function rey_complex_figure(data, res, req) {
    var _id = req.params.id;
    var image = data['imgBase64'];
    var timeSpan = data['timeTaken'];
    var name = data['name'];
    var decoded = dataUriToBuffer(image);
    var imagePath = _id + "/" + name + ".png";
    var figure = 1;

    fs.writeFileSync(uploadPath + imagePath, decoded);

    connection.query('CALL get_participant("' + _id + '")', function (err, result) {
        if (err) throw err;

        var participant = result[0][0];

        connection.query('CALL insert_Rey_Complex_Figure("' + participant._id + '", "' + figure + '", "' + timeSpan + '", "' + imagePath + '")', function (err, result) {
            if (err) throw err;

            res.send("Record Updated");
        });
    });
}
function clock_drawing(data, res, req) {
    var _id = req.params.id;
    var image = data['imgBase64'];
    var name = data['name'];
    var decoded = dataUriToBuffer(image);
    var imagePath = _id + "/" + name + ".png";

    fs.writeFileSync(uploadPath + imagePath, decoded);

    connection.query('CALL get_participant("' + _id + '")', function (err, result) {
        if (err) throw err;

        var participant = result[0][0];

        connection.query('CALL insert_clockDrawing("' + participant._id + '", "' + imagePath + '")', function (err, result) {
            if (err) throw err;

            res.send("Record Updated");
        });
    });
}
function rey_complex_figure_2(data, res, req) {
    var _id = req.params.id;
    var image = data['imgBase64'];
    var timeSpan = data['timeTaken'];
    var name = data['name'];
    var decoded = dataUriToBuffer(image);
    var imagePath = _id + "/" + name + ".png";
    var figure = 2;

    fs.writeFileSync(uploadPath + imagePath, decoded);

    connection.query('CALL get_participant("' + _id + '")', function (err, result) {
        if (err) throw err;

        var participant = result[0][0];

        connection.query('CALL insert_Rey_Complex_Figure("' + participant._id + '", "' + figure + '", "' + timeSpan + '", "' + imagePath + '")', function (err, result) {
            if (err) throw err;

            res.send("Record Updated");
        });
    });
}
function trail_making(data, res, req) {
    var _id = req.params.id;
    var image = data['TMTCanvas1'];
    var image2 = data['TMTCanvas2'];
    var timeSpan = data['timesTMT1'];
    var timeSpan2 = data['timesTMT2'];
    var decoded = dataUriToBuffer(image);
    var decoded2 = dataUriToBuffer(image2);
    var imagePath = _id + "/tmt.png";
    var imagePath2 = _id + "/tmt2.png";

    console.log(data);

    fs.writeFileSync(uploadPath + imagePath, decoded);
    fs.writeFileSync(uploadPath + imagePath2, decoded2);

    connection.query('CALL get_participant("' + _id + '")', function (err, result) {
        if (err) throw err;

        var participant = result[0][0];

        connection.query('CALL insert_trailMaking("' + participant._id + '", "' + timeSpan + '", "' + imagePath + '", "' + timeSpan2 + '", "' + imagePath2 + '")', function (err, result) {
            if (err) throw err;

            res.send("Record Updated");
        });
    });
}
function pitch_recognition(data, res, req) {
    var _id = req.params.id;
    var answers = data.answers;
    var score = data.score;

    console.log(data);

    connection.query('CALL get_participant("' + _id + '")', function (err, result) {
        if (err) throw err;

        var participant = result[0][0];

        connection.query('CALL insert_pitch("' + participant._id + '", "' + score + '", "' +
            answers[0] + '", "' +
            answers[1] + '", "' +
            answers[2] + '", "' +
            answers[3] + '", "' +
            answers[4] + '", "' +
            answers[5] + '", "' +
            answers[6] + '", "' +
            answers[7] + '", "' +
            answers[8] + '", "' +
            answers[9] + '", "' +
            answers[10] + '", "' +
            answers[11] + '", "' +
            answers[12] + '", "' +
            answers[13] + '", "' +
            answers[14] + '", "' +
            answers[15] + '", "' +
            answers[16] + '", "' +
            answers[17] + '", "' +
            answers[18] + '", "' +
            answers[19] + '", "' +
            answers[20] + '", "' +
            answers[21] + '", "' +
            answers[22] + '", "' +
            answers[23] + '")', function (err, result) {
            if (err) throw err;

            res.send("Record Updated");
        });
    });
}
function digital_span(data, res, req) {
    var _id = req.params.id;
    var forward = data.forward;
    var backward = data.backward;
    var name = "";
    var audio = "";
    var decoded = '';
    var audioPath = "";
    var audios = [];

    for (var i = 0;i < forward.length;i++) {
        name = forward[i]['name'];
        audio = forward[i]['soundByte'];
        decoded = new Buffer(audio, 'base64');
        audioPath = _id + "/" + name + ".mp3";

        console.log(uploadPath + audioPath);
        fs.writeFileSync(uploadPath + audioPath, decoded);

        audios.push(audioPath);
    }

    for (var i = 0;i < backward.length;i++) {
        name = backward[i]['name'];
        audio = backward[i]['soundByte'];
        decoded = new Buffer(audio, 'base64');
        audioPath = _id + "/" + name + ".mp3";

        console.log(uploadPath + audioPath);
        fs.writeFileSync(uploadPath + audioPath, decoded);

        audios.push(audioPath);
    }

    console.log(audios);

    connection.query('CALL get_participant("' + _id + '")', function (err, result) {
        if (err) throw err;

        var participant = result[0][0];

        connection.query('CALL insert_digital_span("' + participant._id + '", "' +
            audios[0] + '", "' +
            audios[1] + '", "' +
            audios[2] + '", "' +
            audios[3] + '", "' +
            audios[4] + '", "' +
            audios[5] + '", "' +
            audios[6] + '", "' +
            audios[7] + '", "' +
            audios[8] + '", "' +
            audios[9] + '", "' +
            audios[10] + '", "' +
            audios[11] + '", "' +
            audios[12] + '", "' +
            audios[13] + '", "' +
            audios[14] + '", "' +
            audios[15] + '", "' +
            audios[16] + '", "' +
            audios[17] + '", "' +
            audios[18] + '", "' +
            audios[19] + '", "' +
            audios[20] + '", "' +
            audios[21] + '", "' +
            audios[22] + '", "' +
            audios[23] + '", "' +
            audios[24] + '", "' +
            audios[25] + '", "' +
            audios[26] + '", "' +
            audios[27] + '")', function (err, result) {
            if (err) throw err;

            res.send("Record Updated");
        });
    });
}
function rey_complex_figure_3(data, res, req) {
    var _id = req.params.id;
    var image = data['imgBase64'];
    var timeSpan = data['timeTaken'];
    var name = data['name'];
    var decoded = dataUriToBuffer(image);
    var imagePath = _id + "/" + name + ".png";
    var figure = 3;

    fs.writeFileSync(uploadPath + imagePath, decoded);

    connection.query('CALL get_participant("' + _id + '")', function (err, result) {
        if (err) throw err;

        var participant = result[0][0];

        connection.query('CALL insert_Rey_Complex_Figure("' + participant._id + '", "' + figure + '", "' + timeSpan + '", "' + imagePath + '")', function (err, result) {
            if (err) throw err;

            res.send("Record Updated");
        });
    });
}
function rey_complex_figure_4(data, res, req) {
    var _id = req.params.id;
    var RCFT4_1 = data.RCFT4_1;
    var RCFT4_2 = data.RCFT4_2;
    var RCFT4_3 = data.RCFT4_3;
    var RCFT4_4 = data.RCFT4_4;
    var RCFT4_5 = data.RCFT4_5;
    var RCFT4_6 = data.RCFT4_6;
    var RCFT4_7 = data.RCFT4_7;
    var RCFT4_8 = data.RCFT4_8;
    var RCFT4_9 = data.RCFT4_9;
    var RCFT4_10 = data.RCFT4_10;
    var RCFT4_11 = data.RCFT4_11;
    var RCFT4_12 = data.RCFT4_12;
    var RCFT4_13 = data.RCFT4_13;
    var RCFT4_14 = data.RCFT4_14;
    var RCFT4_15 = data.RCFT4_15;
    var RCFT4_16 = data.RCFT4_16;
    var RCFT4_17 = data.RCFT4_17;
    var RCFT4_18 = data.RCFT4_18;
    var RCFT4_19 = data.RCFT4_19;
    var RCFT4_20 = data.RCFT4_20;
    var RCFT4_21 = data.RCFT4_21;
    var RCFT4_22 = data.RCFT4_22;
    var RCFT4_23 = data.RCFT4_23;
    var RCFT4_24 = data.RCFT4_24;

    console.log(data);
    console.log(RCFT4_1);

    connection.query('CALL get_participant("' + _id + '")', function (err, result) {
        if (err) throw err;

        var participant = result[0][0];

        connection.query('CALL insert_ReyComplexFigure4("' + participant._id + '", "' +
            RCFT4_1 + '", "' +
            RCFT4_2 + '", "' +
            RCFT4_3 + '", "' +
            RCFT4_4 + '", "' +
            RCFT4_5 + '", "' +
            RCFT4_6 + '", "' +
            RCFT4_7 + '", "' +
            RCFT4_8 + '", "' +
            RCFT4_9 + '", "' +
            RCFT4_10 + '", "' +
            RCFT4_11 + '", "' +
            RCFT4_12 + '", "' +
            RCFT4_13 + '", "' +
            RCFT4_14 + '", "' +
            RCFT4_15 + '", "' +
            RCFT4_16 + '", "' +
            RCFT4_17 + '", "' +
            RCFT4_18 + '", "' +
            RCFT4_19 + '", "' +
            RCFT4_20 + '", "' +
            RCFT4_21 + '", "' +
            RCFT4_22 + '", "' +
            RCFT4_23 + '", "' +
            RCFT4_24 + '")', function (err, result) {
            if (err) throw err;

            res.send("Record Updated");
        });
    });
}
function cpt(data, res, req) {
    var _id = req.params.id;
    var hits = data.hits;
    var commissions = data.commissions;
    var omissions = data.omissions;

    console.log(hits);

    // connection.query('CALL get_participant("' + _id + '")', function (err, result) {
    //     if (err) throw err;
    //
    //     var participant = result[0][0];
    //
    //     connection.query('CALL insert_CPT("' + participant._id + '", "' + hits.length + '", "' + commissions + '", "' + omissions + '")', function (err, result) {
    //         if (err) throw err;
    //     });
    //
    //     for (var i = 0;i < hits.length; i++) {
    //         connection.query('CALL insert_CPT_hits("' + participant._id + '", "' + hits[i].reaction + '", "' + hits[i].blocks + '", "' + hits[i].stimuli + '")', function (err, result) {
    //             if (err) throw err;
    //         });
    //     }
    // });
}
function matrices(data, res, req) {
    var _id = req.params.id;
    var matriceA1 = data['answers[matriceA1]'];
    var matriceA2 = data['answers[matriceA2]'];
    var matriceA3 = data['answers[matriceA3]'];
    var matriceA4 = data['answers[matriceA4]'];
    var matriceA5 = data['answers[matriceA5]'];
    var matriceA6 = data['answers[matriceA6]'];
    var matriceA7 = data['answers[matriceA7]'];
    var matriceA8 = data['answers[matriceA8]'];
    var matriceA9 = data['answers[matriceA9]'];
    var matriceA10 = data['answers[matriceA10]'];
    var matriceA11 = data['answers[matriceA11]'];
    var matriceA12 = data['answers[matriceA12]'];
    var matriceB1 = data['answers[matriceB1]'];
    var matriceB2 = data['answers[matriceB2]'];
    var matriceB3 = data['answers[matriceB3]'];
    var matriceB4 = data['answers[matriceB4]'];
    var matriceB5 = data['answers[matriceB5]'];
    var matriceB6 = data['answers[matriceB6]'];
    var matriceB7 = data['answers[matriceB7]'];
    var matriceB8 = data['answers[matriceB8]'];
    var matriceB9 = data['answers[matriceB9]'];
    var matriceB10 = data['answers[matriceB10]'];
    var matriceB11 = data['answers[matriceB11]'];
    var matriceB12 = data['answers[matriceB12]'];
    var matriceC1 = data['answers[matriceC1]'];
    var matriceC2 = data['answers[matriceC2]'];
    var matriceC3 = data['answers[matriceC3]'];
    var matriceC4 = data['answers[matriceC4]'];
    var matriceC5 = data['answers[matriceC5]'];
    var matriceC6 = data['answers[matriceC6]'];
    var matriceC7 = data['answers[matriceC7]'];
    var matriceC8 = data['answers[matriceC8]'];
    var matriceC9 = data['answers[matriceC9]'];
    var matriceC10 = data['answers[matriceC10]'];
    var matriceC11 = data['answers[matriceC11]'];
    var matriceC12 = data['answers[matriceC12]'];
    var matriceD1 = data['answers[matriceD1]'];
    var matriceD2 = data['answers[matriceD2]'];
    var matriceD3 = data['answers[matriceD3]'];
    var matriceD4 = data['answers[matriceD4]'];
    var matriceD5 = data['answers[matriceD5]'];
    var matriceD6 = data['answers[matriceD6]'];
    var matriceD7 = data['answers[matriceD7]'];
    var matriceD8 = data['answers[matriceD8]'];
    var matriceD9 = data['answers[matriceD9]'];
    var matriceD10 = data['answers[matriceD10]'];
    var matriceD11 = data['answers[matriceD11]'];
    var matriceD12 = data['answers[matriceD12]'];
    var matriceE1 = data['answers[matriceE1]'];
    var matriceE2 = data['answers[matriceE2]'];
    var matriceE3 = data['answers[matriceE3]'];
    var matriceE4 = data['answers[matriceE4]'];
    var matriceE5 = data['answers[matriceE5]'];
    var matriceE6 = data['answers[matriceE6]'];
    var matriceE7 = data['answers[matriceE7]'];
    var matriceE8 = data['answers[matriceE8]'];
    var matriceE9 = data['answers[matriceE9]'];
    var matriceE10 = data['answers[matriceE10]'];
    var matriceE11 = data['answers[matriceE11]'];
    var matriceE12 = data['answers[matriceE12]'];
console.log(data);
    connection.query('CALL get_participant("' + _id + '")', function (err, result) {
        if (err) throw err;

        var participant = result[0][0];

        connection.query('CALL insert_Matrices("' + participant._id + '", "' +
            matriceA1 + '", "' +
            matriceA2 + '", "' +
            matriceA3 + '", "' +
            matriceA4 + '", "' +
            matriceA5 + '", "' +
            matriceA6 + '", "' +
            matriceA7 + '", "' +
            matriceA8 + '", "' +
            matriceA9 + '", "' +
            matriceA10 + '", "' +
            matriceA11 + '", "' +
            matriceA12 + '", "' +
            matriceB1 + '", "' +
            matriceB2 + '", "' +
            matriceB3 + '", "' +
            matriceB4 + '", "' +
            matriceB5 + '", "' +
            matriceB6 + '", "' +
            matriceB7 + '", "' +
            matriceB8 + '", "' +
            matriceB9 + '", "' +
            matriceB10 + '", "' +
            matriceB11 + '", "' +
            matriceB12 + '", "' +
            matriceC1 + '", "' +
            matriceC2 + '", "' +
            matriceC3 + '", "' +
            matriceC4 + '", "' +
            matriceC5 + '", "' +
            matriceC6 + '", "' +
            matriceC7 + '", "' +
            matriceC8 + '", "' +
            matriceC9 + '", "' +
            matriceC10 + '", "' +
            matriceC11 + '", "' +
            matriceC12 + '", "' +
            matriceD1 + '", "' +
            matriceD2 + '", "' +
            matriceD3 + '", "' +
            matriceD4 + '", "' +
            matriceD5 + '", "' +
            matriceD6 + '", "' +
            matriceD7 + '", "' +
            matriceD8 + '", "' +
            matriceD9 + '", "' +
            matriceD10 + '", "' +
            matriceD11 + '", "' +
            matriceD12 + '", "' +
            matriceE1 + '", "' +
            matriceE2 + '", "' +
            matriceE3 + '", "' +
            matriceE4 + '", "' +
            matriceE5 + '", "' +
            matriceE6 + '", "' +
            matriceE7 + '", "' +
            matriceE8 + '", "' +
            matriceE9 + '", "' +
            matriceE10 + '", "' +
            matriceE11 + '", "' +
            matriceE12 + '")', function (err, result) {
            if (err) throw err;

            res.send("Record Updated");
        });
    });
}
function pegboard(data, res, req) {
    var _id = req.params.id;
    var image = data['motorTask1a'];
    var image2 = data['motorTask1b'];
    var image3 = data['motorTask2a'];
    var image4 = data['motorTask2b'];
    var image5 = data['motorTask3a'];
    var image6 = data['motorTask3b'];
    var timeSpan = data['timesTMT1'];
    var timeSpan2 = data['timesTMT2'];
    var decoded = dataUriToBuffer(image);
    var decoded2 = dataUriToBuffer(image2);
    var decoded3 = dataUriToBuffer(image3);
    var decoded4 = dataUriToBuffer(image4);
    var decoded5 = dataUriToBuffer(image5);
    var decoded6 = dataUriToBuffer(image6);
    var imagePath = _id + "/motor.png";
    var imagePath2 = _id + "/motor2.png";
    var imagePath3 = _id + "/motor3.png";
    var imagePath4 = _id + "/motor4.png";
    var imagePath5 = _id + "/motor5.png";
    var imagePath6 = _id + "/motor6.png";

    console.log(data);

    fs.writeFileSync(uploadPath + imagePath, decoded);
    fs.writeFileSync(uploadPath + imagePath2, decoded2);
    fs.writeFileSync(uploadPath + imagePath3, decoded3);
    fs.writeFileSync(uploadPath + imagePath4, decoded4);
    fs.writeFileSync(uploadPath + imagePath5, decoded5);
    fs.writeFileSync(uploadPath + imagePath6, decoded6);

    connection.query('CALL get_participant("' + _id + '")', function (err, result) {
        if (err) throw err;

        var participant = result[0][0];

        connection.query('CALL insert_motorTask("' + participant._id + '", "' + timeSpan + '", "' + imagePath + '", "' + timeSpan2 + '", "' + imagePath2 + '", "' + imagePath3 + '", "' + imagePath4 + '", "' + imagePath5 + '", "' + imagePath6 + '")', function (err, result) {
            if (err) throw err;

            res.send("Record Updated");
        });
    });
}
function word_list(data, res, req) {
    var _id = req.params.id;
    var task = data.task;
    var name = "";
    var audio = "";
    var decoded = '';
    var audioPath = "";
    var audios = [];

    for (var i = 0;i < task.length;i++) {
        name = task[i]['name'];
        audio = task[i]['soundByte'];
        decoded = new Buffer(audio, 'base64');
        audioPath = _id + "/" + name + ".mp3";

        console.log(uploadPath + audioPath);
        fs.writeFileSync(uploadPath + audioPath, decoded);

        audios.push(audioPath);
    }


    connection.query('CALL get_participant("' + _id + '")', function (err, result) {
        if (err) throw err;

        var participant = result[0][0];

        connection.query('CALL insert_wordlist("' + participant._id + '", "' +
            audios[0] + '", "' +
            audios[1] + '", "' +
            audios[2] + '", "' +
            audios[3] + '", "' +
            audios[4] + '", "' +
            audios[5] + '", "' +
            audios[6] + '")', function (err, result) {
            if (err) throw err;

            res.send("Record Updated");
        });
    });

}
function stroop(data, res, req) {
    var _id = req.params.id;
    var task = data.task;
    var name = "";
    var audio = "";
    var decoded = '';
    var audioPath = "";
    var audios = [];


    for (var i = 0;i < task.length;i++) {
        name = task[i]['name'];
        audio = task[i]['soundByte'];
        decoded = new Buffer(audio, 'base64');
        audioPath = _id + "/" + name + ".mp3";

        console.log(uploadPath + audioPath);
        fs.writeFileSync(uploadPath + audioPath, decoded);

        audios.push(audioPath);
    }

    connection.query('CALL get_participant("' + _id + '")', function (err, result) {
        if (err) throw err;

        var participant = result[0][0];

        connection.query('CALL insert_stroop("' + participant._id + '", "' +
            audios[0] + '", "' +
            audios[1] + '", "' +
            audios[2] + '", "' +
            audios[3] + '")', function (err, result) {
            if (err) throw err;

            res.send("Record Updated");
        });
    });
}
function cancellation(data, res, req) {
    var _id = req.params.id;
    var incorrect = data.incorrectSubmissionCount;
    var correct = data.correctSubmissionCount;
    var clickData = data.clickData;

    console.log(data);

    connection.query('CALL get_participant("' + _id + '")', function (err, result) {
        if (err) throw err;

        var participant = result[0][0];

        connection.query('CALL insert_cancellation("' + participant._id + '", "' + incorrect + '", "' + correct + '")', function (err, result) {
            if (err) throw err;

            res.send("Record Updated");
        });

        for (var i = 0; i < clickData.length; i++) {
            connection.query('CALL insert_cancellation_data("' + participant._id + '", "' + clickData[i]['block'] + '", "' + clickData[i]['blockRow'] + '", "' + clickData[i]['blockCol'] + '", "' + clickData[i]['blockValue'] + '", "' + clickData[i]['timeV'] + '")', function (err, result) {
                if (err) throw err;
            });
        }
    });
}
function word_list_2(data, res, req) {
    var _id = req.params.id;
    var answers = data.answers;
    var soundByte = data.soundByte;

    console.log(data);

    var name = "wordlistRecall";
    var audio = soundByte;
    var decoded = new Buffer(audio, 'base64');
    var audioPath = _id + "/" + name + ".mp3";

    console.log(uploadPath + audioPath);
    fs.writeFileSync(uploadPath + audioPath, decoded);

    connection.query('CALL get_participant("' + _id + '")', function (err, result) {
        if (err) throw err;

        var participant = result[0][0];

        connection.query('CALL insert_wordlist2("' + participant._id + '", "' + audioPath + '", "' +
            answers[0] + '", "' +
            answers[1] + '", "' +
            answers[2] + '", "' +
            answers[3] + '", "' +
            answers[4] + '", "' +
            answers[5] + '", "' +
            answers[6] + '", "' +
            answers[7] + '", "' +
            answers[8] + '", "' +
            answers[9] + '", "' +
            answers[10] + '", "' +
            answers[11] + '", "' +
            answers[12] + '", "' +
            answers[13] + '", "' +
            answers[14] + '", "' +
            answers[15] + '", "' +
            answers[16] + '", "' +
            answers[17] + '", "' +
            answers[18] + '", "' +
            answers[19] + '", "' +
            answers[20] + '", "' +
            answers[21] + '", "' +
            answers[22] + '", "' +
            answers[23] + '", "' +
            answers[24] + '", "' +
            answers[25] + '", "' +
            answers[26] + '", "' +
            answers[27] + '", "' +
            answers[28] + '", "' +
            answers[29] + '", "' +
            answers[30] + '", "' +
            answers[31] + '", "' +
            answers[32] + '", "' +
            answers[33] + '", "' +
            answers[34] + '", "' +
            answers[35] + '", "' +
            answers[36] + '", "' +
            answers[37] + '", "' +
            answers[38] + '", "' +
            answers[39] + '", "' +
            answers[40] + '", "' +
            answers[41] + '", "' +
            answers[42] + '", "' +
            answers[43] + '")', function (err, result) {
            if (err) throw err;

            res.send("Record Updated");
        });
    });
}
function naming_task(data, res, req) {
    var _id = req.params.id;
    var task = data.task;
    var name = "";
    var audio = "";
    var decoded = '';
    var audioPath = "";
    var audios = [];

    for (var i = 0;i < task.length;i++) {
        name = task[i]['name'];
        audio = task[i]['soundByte'];
        decoded = new Buffer(audio, 'base64');
        audioPath = _id + "/" + name + ".mp3";

        fs.writeFileSync(uploadPath + audioPath, decoded);

        audios.push(audioPath);
    }

    // connection.query('CALL get_participant("' + _id + '")', function (err, result) {
    //     if (err) throw err;
    //
    //     var participant = result[0][0];

        console.log(audios);

        connection.query('CALL insert_naming_task("' + _id + '", "' +
            audios[0] + '", "' +
            audios[1] + '", "' +
            audios[2] + '", "' +
            audios[3] + '", "' +
            audios[4] + '", "' +
            audios[5] + '", "' +
            audios[6] + '", "' +
            audios[7] + '", "' +
            audios[8] + '", "' +
            audios[9] + '", "' +
            audios[10] + '", "' +
            audios[11] + '", "' +
            audios[12] + '", "' +
            audios[13] + '", "' +
            audios[14] + '", "' +
            audios[15] + '", "' +
            audios[16] + '", "' +
            audios[17] + '", "' +
            audios[18] + '", "' +
            audios[19] + '")', function (err, result) {
            if (err) throw err;

            res.send("Record Updated");
        });
    // });
}
function comprehension(data, res, req) {
    var _id = req.params.id;
    var comprehension1 = data.comprehension1;
    var comprehension2 = data.comprehension2;
    var comprehension3 = data.comprehension3;
    var comprehension4 = data.comprehension4;
    var comprehension5 = data.comprehension5;
    var comprehension6 = data.comprehension6;
    var comprehension7 = data.comprehension7;
    var comprehension8 = data.comprehension8;
    var comprehension9 = data.comprehension9;
    var comprehension10 = data.comprehension10;
    var comprehension11 = data.comprehension11;
    var comprehension12 = data.comprehension12;
    var comprehension13 = data.comprehension13;
    var comprehension14 = data.comprehension14;
    var comprehension15 = data.comprehension15;
    var comprehension16 = data.comprehension16;
    var comprehension17 = data.comprehension17;
    var comprehension18 = data.comprehension18;
    var comprehension19 = data.comprehension19;
    var comprehension20 = data.comprehension20;
    var comprehension21 = data.comprehension21;

    console.log(data);

    connection.query('CALL get_participant("' + _id + '")', function (err, result) {
        if (err) throw err;

        var participant = result[0][0];

        connection.query('CALL insert_comprehension("' + participant._id + '", "' +
            comprehension1 + '", "' +
            comprehension2 + '", "' +
            comprehension3 + '", "' +
            comprehension4 + '", "' +
            comprehension5 + '", "' +
            comprehension6 + '", "' +
            comprehension7 + '", "' +
            comprehension8 + '", "' +
            comprehension9 + '", "' +
            comprehension10 + '", "' +
            comprehension11 + '", "' +
            comprehension12 + '", "' +
            comprehension13 + '", "' +
            comprehension14 + '", "' +
            comprehension15 + '", "' +
            comprehension16 + '", "' +
            comprehension17 + '", "' +
            comprehension18 + '", "' +
            comprehension19 + '", "' +
            comprehension20 + '", "' +
            comprehension21 + '")', function (err, result) {
            if (err) throw err;

            res.send("Record Updated");
        });
    });
}
function eye_test(data, res, req) {
    var _id = req.params.id;
    var question1 = data.question1;
    var question2 = data.question2;
    var question3 = data.question3;
    var question4 = data.question4;
    var question5 = data.question5;
    var question6 = data.question6;
    var question7 = data.question7;
    var question8 = data.question8;
    var question9 = data.question9;
    var question10 = data.question10;
    var question11 = data.question11;
    var question12 = data.question12;
    var question13 = data.question13;
    var question14 = data.question14;
    var question15 = data.question15;
    var question16 = data.question16;
    var question17 = data.question17;
    var question18 = data.question18;
    var question19 = data.question19;
    var question20 = data.question20;
    var question21 = data.question21;
    var question22 = data.question22;
    var question23 = data.question23;
    var question24 = data.question24;
    var question25 = data.question25;
    var question26 = data.question26;
    var question27 = data.question27;
    var question28 = data.question28;
    var question29 = data.question29;
    var question30 = data.question30;
    var question31 = data.question31;
    var question32 = data.question32;
    var question33 = data.question33;
    var question34 = data.question34;
    var question35 = data.question35;
    var question36 = data.question36;

    console.log(data);

    connection.query('CALL get_participant("' + _id + '")', function (err, result) {
        if (err) throw err;

        var participant = result[0][0];

        connection.query('CALL insert_Eyes("' + participant._id + '", "' +
            question1 + '", "' +
            question2 + '", "' +
            question3 + '", "' +
            question4 + '", "' +
            question5 + '", "' +
            question6 + '", "' +
            question7 + '", "' +
            question8 + '", "' +
            question9 + '", "' +
            question10 + '", "' +
            question11 + '", "' +
            question12 + '", "' +
            question13 + '", "' +
            question14 + '", "' +
            question15 + '", "' +
            question16 + '", "' +
            question17 + '", "' +
            question18 + '", "' +
            question19 + '", "' +
            question20 + '", "' +
            question21 + '", "' +
            question22 + '", "' +
            question23 + '", "' +
            question24 + '", "' +
            question25 + '", "' +
            question26 + '", "' +
            question27 + '", "' +
            question28 + '", "' +
            question29 + '", "' +
            question30 + '", "' +
            question31 + '", "' +
            question32 + '", "' +
            question33 + '", "' +
            question34 + '", "' +
            question35 + '", "' +
            question36 + '")', function (err, result) {
            if (err) throw err;

            res.send("Record Updated");
        });
    });
}

module.exports = router;
