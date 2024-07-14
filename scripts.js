// Initialize a variable to keep track of the last topic ID
let lastId = null;

// Define the header for the API requests and authorize for it
const header = {
    'Authorization': 'Bearer WCy2qv8EFLOVH15h2fZ0ThmFEogqJd94vOpA_2Cv3aM',
};

// Function to get the URL for photos of a specific topic
function getTopicPhotoUrl(id) {
    return `https://api.unsplash.com/topics/${id}/photos`
}

// Function to fetch and display gallery data from a given URL
function galleryData(url) {
    $.ajax({
        url: url,
        headers: header,
        success: function (data) {
            // Empty the gallery
            $('#gallery').empty();

            // Loop through each item in the data
            $.each(data, function (i, item) {
                // Create an image element for each item and append it to the gallery
                const img = $('<img>').attr('src', item.urls.full).appendTo('#gallery');

                // Add a click event listener to the image to open it in a modal
                img.click(function () {
                    $('#myModal').show();
                    $('#img01').attr('src', this.src);
                });
            });
        },
        error: function (err) {
            // Log any errors
            console.error(err);
        }
    });
}

// Function to list topics and add them as filters
function listTopic(page) {
    $.ajax({
        url: `https://api.unsplash.com/topics?page=${page || 1}`,
        headers: header,
        success: function (data) {
            // Create a button for all images and add it to the filters
            const allImages = $('<button>').text('All').appendTo('#filters');

            // Fetch and display all photos
            galleryData(`https://api.unsplash.com/photos`);

            // Loop through each topic in the data
            $.each(data, function (i, topic) {
                // Create a button for each topic and add it to the filters
                const topicButton = $('<button>').text(topic.title).appendTo('#filters');

                // Add a click event listener to the button to fetch and display photos of the topic
                topicButton.click(function () {
                    // If the topic is the same as the last one, do nothing
                    if (topic.id === lastId) {
                        return
                    }

                    // Fetch and display photos of the topic
                    galleryData(getTopicPhotoUrl(topic.id));

                    // Update the last topic ID
                    lastId = topic.id;
                });
            });

            // Log the data
            console.log(data);
        },
        error: function (err) {
            // Log any errors
            console.error(err);
        }
    });
}

listTopic();

// Get the modal
const modal = $("#myModal");

// Get the <span> element that closes the modal
const span = $(".close").first();

// When the user clicks on <span> (x), close the modal
span.click(function () {
    modal.css("display", "none");
});

// When the user clicks anywhere outside of the modal, close it
$(window).click(function (event) {
    if (event.target == modal[0]) {
        modal.css("display", "none");
    }
});

