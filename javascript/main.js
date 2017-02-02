
$(document).ready(function() {
    
    ////////////////////////////
    //       Variables        //
    ////////////////////////////

    // The dateArray holds the dates for each picture loaded in order to allow
    // the user to view pictures viewed in the past. The date counter variable
    // keeps track of the users place in the array.
    
    var dateArray = [];
    var dateCounter = 0;


    ////////////////////////////
    //       Functions        //
    ////////////////////////////

    // This function creates a random date to be passed to the NASA APOD archive
    // via the API when the grabImage function is run.

    function imageAdvance(){
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
        dateArray.push(YYYY + "-" + MM + "-" + DD);
        grabImage();
        $("#apod_img_id").fadeToggle();
    };

    // This function connects to the APOD archive via an API, pulls the image data 
    // and associated text, and pushes it to index.html.

    function grabImage(){
        $("#apod_img_id").fadeToggle();
        $.ajax({
            url: "https://api.nasa.gov/planetary/apod",
            
            type: "GET",

            data: jQuery.param({
                              api_key: "*****", 
                              date: dateArray[dateCounter]
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
                dateCounter++;
            console.log("Success!");
            },
            error: function(result){
                console.log("Ugh. . .");
            }
        });
    }


    ///////////////////////////////
    // Page Setup Function Calls //
    ///////////////////////////////

    // These two function calls 1.) bring an image to the page when it loads and 
    // 2.) advance the images on a timer.
    imageAdvance();

    setInterval(imageAdvance, 10000);


    ////////////////////////////
    //    Event Listeners     //
    ////////////////////////////

    $("#nextImage").click(imageAdvance);

    $("#previousImage").click(function(event) {
        $("#apod_img_id").fadeToggle();
        // The counter reduces by two here because it advances after the image loads. 
        // The "previous" click needs the counter to bypass the inactive counter advance 
        // and get to counter number for the prior photo.
        dateCounter = dateCounter - 2; 
        grabImage();
    });

    // These two listeners reveal and hide the text accompanying each image
    $("#apod_img_id").mouseenter(function(event) {
        $("#apod_explaination").removeClass("hidden");
        $("#copyright").removeClass("hidden");
        $("#apod_img_id").addClass("opacity");
        console.log("over!");
    });

    $("#apod_img_id").mouseleave(function(event) {
        $("#apod_explaination").addClass("hidden");
        $("#copyright").addClass("hidden");
        $("#apod_img_id").removeClass("opacity");
    });
});

