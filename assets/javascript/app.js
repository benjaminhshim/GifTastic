$(document).ready(function() {

    // STORE RAPPERS INTO ARRAY topics
    var topics = ['KANYE', 'DRAKE', 'LIL PUMP', '21 SAVAGE', 'LIL UZI VERT', 'LIL SKIES', 'SMOKEPURPP', 'LIL YACHTY', 'XXXTENTACION', 'CARDI B', 'TRIPPIE REDD', 'SKI MASK THE SLUMP GOD'];


    // CREATE FUNCTION TO DISPLAY RAPPER AFTER CLICKING THEIR BUTTON
    function displayRapperGif() {

        // STORE VARIABLE WITH RAPPER BUTTON WITH ATTR data-name
        var rapper = $(this).attr('data-name');

        // CREATE URL FOR AJAX REQUEST AND SORT BY SEARCH NAME
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + rapper + "&api_key=dc6zaTOxFJmzC&limit=10&fixed_width=100";


        // CREATE AJAX REQUEST
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).then(function(response) {

            // CREATE A VARIABLE FOR EACH ELEMENT IN RESPONSE ARRAY
            var results = response.data;
            console.log(results);

            // LOOP THROUGH RESPONSE ARRAY
            for (var i = 0; i < results.length; i++) {

                // CREATE A DIV TO HOLD EACH GIF
                var gifDiv = $("<div class='item'>");

                // GET IMAGE URL AND STORE INTO VARIABLE
                var gifUrlStill = results[i].images.fixed_height_still.url;
                var gifUrlAnimate = results[i].images.fixed_height.url;
                
                // CREATE IMAGE ELEMENT AND STORE URL
                var gifImage = $("<img>");
                gifImage.attr('src', gifUrlStill);
                gifImage.attr('data-animate', gifUrlAnimate);
                gifImage.attr('data-still', gifUrlStill);
                gifImage.attr('data-state', 'still');

                // APPEND GIF IMAGE TO gifDiv
                gifDiv.append(gifImage);

                var gifTitle = results[i].title;
                var titleDiv = $('<div class=title>');
                titleDiv.append('Title: ' + gifTitle);
                gifDiv.append(titleDiv);

                var gifAuthor = results[i].username;
                var authorDiv = $('<div class=author>');
                authorDiv.append('Created by: ' + gifAuthor);
                gifDiv.append(authorDiv);


                var gifRating = results[i].rating;
                var ratingDiv = $('<div class=rating>');
                ratingDiv.append('Rating: ' + gifRating);
                gifDiv.append(ratingDiv);

                var favIcon = $('<i class="fa fa-star-o clicked" id="fav-star"></i>');
                gifDiv.append(favIcon);


                // APPEND EACH DIV OF GIFS TO #rappers IN WINDOW
                $("#rappers").append(gifDiv);
            };
        });


        // BANDSINTOWN API
        var queryURL = 'https://rest.bandsintown.com/artists/' + rapper + '/events?app_id=485174cbd663c885e7ae36fba2c8f831&limit=10';
    
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).then(function(response) {
            console.log(response);

            for (var i = 0; i < 10; i++) {

                // CREATE A DIV TO HOLD EACH SHOW INFO
                var showCard = $("<div class='card'>");
                
                // CREATE IMAGE ELEMENT AND STORE URL
                var showCardBody = $("<div class='card-body'>");

                var artistName = response[i].lineup[0];
                var artistUpperCase = artistName.toUpperCase();
                var nameDiv = $('<p class=artist-name>');
                nameDiv.append(artistUpperCase);
                showCardBody.append(nameDiv);

                var venueName = response[i].venue.name;
                var venueDiv = $('<p class=venue-name>');
                venueDiv.append('Venue: ' + venueName);
                nameDiv.append(venueDiv);

                var venueCity = response[i].venue.city;

                var venueCountry = response[i].venue.country;

                var venueState = response[i].venue.region;

                var venueLocation = venueCity + ', ' + venueState + ', ' + venueCountry;
                var venueLocationDiv = $('<p class="location">');
                venueLocationDiv.append('Where: ' + venueLocation);
                venueDiv.append(venueLocationDiv);

                var dateTime = response[i].datetime;
                var dateOnly = dateTime.slice(0, -9);
                var dateTimeDiv = $('<p class=date-time>');
                dateTimeDiv.append('When: ' + dateOnly);
                venueLocationDiv.append(dateTimeDiv);

                var ticketStatus = response[i].offers[0].status;
                var ticketStatusDiv = $('<p class=ticket-status>');
                ticketStatusDiv.append('Tickets: ' + ticketStatus);
                dateTimeDiv.append(ticketStatusDiv);

                showCard.append(showCardBody);

                // APPEND EACH DIV OF GIFS TO #rappers IN WINDOW
                $("#show-dates").append(showCard);
            }
        });



        // // SPOTIFY API
        // var spotifyAuth = 'BQAL8hmbXTGcvJvRnLERcUTvjLmY5NhtceQrlTzF7MHNh1BsHSXCRCjqU7a6gKq_duWZL0w3xeOMMANp2zxpA0nJNz6-8vMUiCBYSHNyFsyQnKbLOOZCplCzzsQjKxUx2JEphw4UTF0Z3ndn';
        // var queryURL = 'https://api.spotify.com/v1/search?q=' + rapper;

        // $.ajax({
        //     url: queryURL,
        //     method: 'GET',
        //     headers: {
        //         'Authorization' : 'Bearer ' + spotifyAuth
        //     },
        // }).then(function(response) {
        //     console.log(response);
        //     // var artistId = response.tracks.items[0].id;
        // });


        // LAST.FM API
        var lastFmId = 'beecd54d4bc8bcad4a659854011009a1';
        var queryURL = 'http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=' + rapper + '&api_key=' + lastFmId + '&format=json';

        $.ajax({
            url: queryURL,
            method: 'GET'
        }).then(function(response) {
            console.log(response);

            var artistLink = response.toptracks.track[0].artist.url;

            var result = response.toptracks.track;
            console.log(result);

            //$('#last-fm-artist-url').attr('href', artistLink);

            for (var i = 0; i < 5; i++ ) {

                var songCard = $('<div class="" id="song-card">');

                var songCardBody = $('<div class="card-body" id="song-card-body">');


                var songArtist = response.toptracks['@attr'].artist;
                var songArtistDiv = $('<p id="last-fm-song-artist">');
                songArtistDiv.append('Artist: ' + songArtist);
                songCardBody.append(songArtistDiv);

                var songTitle = response.toptracks.track[i].name;
                var songTitleDiv = $('<p id="last-fm-song-title">');
                songTitleDiv.append('Song: ' + songTitle);
                songCardBody.append(songTitleDiv);


                var songPlayCount = response.toptracks.track[i].playcount;
                var playCountDiv = $('<p id="last-fm-playcount">');
                playCountDiv.append('Playcount: ' + songPlayCount);
                songCardBody.append(playCountDiv);

                var songListeners = response.toptracks.track[i].listeners;
                var listenersDiv = $('<p id="last-fm-listeners">');
                listenersDiv.append('Listeners: ' + songListeners);
                songCardBody.append(listenersDiv);

                songCard.append(songCardBody);
                $('#top-songs').append(songCard);
            }
        });


        // YOUTUBE API
        var youTubeId = 'AIzaSyBtv3FuM4yag2Qpr17dHewi4EmhFzeWEy0';
        var queryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" + rapper + "&key=" + youTubeId + '&type=video';


        $.ajax({
            url: queryURL,
            method: 'GET'
        }).then(function(response) {
            console.log(response);
            $('#ytplayer').attr('src', 'https://www.youtube.com/embed/' + response.items[0].id.videoId);
        });



        // CREATE CLICK FUNCTION FOR UNPAUSING & PAUSING GIF ANIMATION
        $('img').click(function() {
            var $state = $(this).attr('data-state');

            var dataAnimate = $(this).attr('data-animate');
            var dataStill = $(this).attr('data-still');
            
            if ( $state == 'still' ) {
                $(this).attr('src', dataAnimate);
                $(this).attr('data-state', 'animate');
            } else if ( $state == 'animate' ) {
                $(this).attr('src', dataStill);
                $(this).attr('data-state', 'still');
            }
        });


        
    };



    // CREATE A BUTTON NAMED AFTER RAPPER STORE IN INPUT VALUE
    function renderButtons() {

        // CLEAR ALL BUTTONS EVERY TIME USER ADDS RAPPER
        $('#rapperButtons').empty();

        // LOOP THROUGH ALL ELEMENTS IN ARRAY topics
        for (var i = 0; i < topics.length; i++) {

            // DYNAMICALLY REATE A BUTTON ELEMENT
            var button = $('<button>');

            // ADD A CLASS OF rapper-btn TO EACH BUTTON ELEMENT
            button.addClass('btn btn-light rapper-btn');

            // ADD ATTRIBUTE OF data-name AND ARRAY ELEMENT TO EACH BUTTON
            button.attr('data-name', topics[i]);


            // DISPLAY TEXT TO EACH BUTTON
            button.text(topics[i]);

            // ADD BUTTON TO #rapperButtons DIV
            $('#rapperButtons').append(button);
        }
    };




    // BUTTON CLICK

    $('#addRapper').click(function() {

        event.preventDefault();

        // STORE INPUT VALUE INTO VARIABLE
        var rapper = $('#rapper-input').val().toUpperCase();;

        // PUSH NEW RAPPER VALUE INTO ARRAY OF topics
        topics.push(rapper);

        // CALL FUNCTION TO CREATE BUTTON
        renderButtons();
        
    });



    
    // DISPLAY GIFS AFTER USER CLICKS ON NEW BUTTON WITH CLASS .rapper-btn
    $(document).on('click', '.rapper-btn', displayRapperGif);

    // CALL renderButtons() TO DISPLAY DEFAULT BUTTONS AT START
    renderButtons();


});