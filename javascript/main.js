
$(document).ready(function() {

    console.log("Hello, main.js.")
    
   // Establish a random date, preparing for the form YYYY-MM-DD (2017-02-01)
    var YYYY = Math.floor(Math.random() * (2016 - 2000 + 1) + 2000);
    var MM = Math.floor((Math.random() * 10) + 1);
    if (MM < 10) {
        MM = "0" + MM;
    } else {
        MM = MM;
    }
    var DD = Math.floor((Math.random() * 28) + 1);
    if (DD < 10) {
        DD = "0" + DD;
    } else {
        MM = MM;
    }

    // Connect to the NASA API
    // Feed random date to API
    // Pull random picture and attendant data
    
    $.ajax({
        url: "https://api.nasa.gov/planetary/apod",
        
        type: "GET",

       data: jQuery.param({
                          api_key: "5s3gfhI8AOjCipanjrPMU7Qjntdvucf7MUINzcK7", 
                          date: YYYY + "-" + MM + "-" + DD
                         }),
        success: function(result){
            if("copyright" in result) {
                $("#copyright").text("Image Credits: " + result.copyright);
            }
            else {
                $("#copyright").text("Image Credits: " + "Public Domain");
            }

            if(result.media_type == "video") {
                $("#apod_img_id").css("display", "none"); 
                $("#apod_vid_id").attr("src", result.url);
            }
            else {
                $("#apod_vid_id").css("display", "none"); 
                $("#apod_img_id").attr("src", result.url);
            }
            $("#apod_explaination").text(result.explanation);
            $("#apod_title").text(result.title);
            console.log("Success!")
        },
        error: function(result){
            console.log("Ugh. . .");
        }
    });

});