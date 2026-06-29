function Post() {
    const posts =[
        "AlarmClock.txt",
        "RadioFox.txt",
        "MeshtasticRepeater.txt"
    ]

    // Get the div container to put this all in
    const postsContainer = document.getElementById('posts');

    posts.forEach(post => {
        let post_loc = "https://people.tamu.edu/~jemcmillin1/Posts/" + post;
        fetch(post_loc)
            .then(response => response.text())
            .then(data => {
                const lines = data.split('\n');
                // Safely handle missing metadata lines with null checks
                const titleLine = lines.find(line => line.startsWith("Title:"));
                const title = titleLine ? titleLine.replace('Title: ', '') : 'No Title';

                const dateLine = lines.find(line => line.startsWith("Date:"));
                const date = dateLine ? dateLine.replace('Date: ', '') : 'No Date';

                const imgLine = lines.find(line => line.startsWith("Img:"));
                const img = imgLine ? imgLine.replace('Img: ', '') : 'No Image';

                const stringLine = lines.find(line => line.startsWith("String:"));
                const postString = stringLine ? stringLine.replace('String: ', '') : '';
                let content = lines.slice(5).join('\n');

                // Replace {} with img html
                content = content.replace(/\{(.+?)\}/g, (match, placeholder) => {
                    if (placeholder.startsWith("img:")){
                        let post_image = placeholder.slice(4);
                        return `<img src="${post_image}" alt="${post_image}" style="max-width: 100%; height: auto;">`;
                    }
                    else if (placeholder.startsWith("link:")){
                        let [url, text] = placeholder.slice(5).split('|');
                        return `<a href="${url}" target="_blank">${text}</a>`;
                    }
                    else {
                        return match;
                    }
                });

                const postDiv = document.createElement('div');
                postDiv.className= 'BlogItem';

                const postTitle = document.createElement('h2');
                postTitle.className = 'postTitle'
                postTitle.innerHTML = `<u>${title}</u>`;

                const postDate = document.createElement('p');
                postDate.className = 'postDate'
                postDate.innerHTML = `<em>${date}</em>`;

                const postImage = document.createElement('div');
                postImage.className = 'postImage';
                postImage.innerHTML = `<img src="${img}" alt="${img}">`;

                const postContent = document.createElement('p');
                postContent.className = 'postContent'
                postContent.innerHTML = content;

                // Apply content
                postDiv.appendChild(postTitle);
                postDiv.appendChild(postDate);
                postDiv.appendChild(postImage);
                postDiv.appendChild(postContent);

                postsContainer.appendChild(postDiv);
            })
            .catch(error => console.error(`Error loading ${post}:`, error));
    });
}
Post();