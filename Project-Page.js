// Get the query string
const queryParams = new URLSearchParams(window.location.search);
const project = queryParams.get('project'); // Get the "user" parameter

console.log(project);
console.log("Hey Hacker Man");

const posts =[
    "AlarmClock.txt",
    "RadioFox.txt",
    "MeshtasticRepeater.txt"
];
let stringed_posts = [];
// Fetch the requested post 
posts.forEach(post => {
    // Get location of post
    let post_loc = "https://people.tamu.edu/~jemcmillin1/Posts/" + post;
        fetch(post_loc)
            .then(response => response.text())
            .then(data => {
                // Get the post String
                const lines = data.split('\n');

                const stringLine = lines.find(line => line.startsWith("String:"));
                const postString = stringLine ? imgLine.replace('String: ', '') : '';

                //Filter posts based on String / add them to stringed_posts array
                if (postString === project){
                    stringed_posts.push(post);
                }
        
            })
});

// Sort the Posts in string_posts by date (oldest first)

//Styling

