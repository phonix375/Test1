1. How long did you spend on the coding assignment?
    about 2 hours
a. What would you add to your solution if you had more time?
    I would divide the code into more components to separate most logic and API calls from the component, and spend more time on design and style
b. If you didn&#39;t spend much time on the coding test, then use this as an opportunity to
explain what you would add.
    For this website, I wanted to add a database to save the most common searches and add functionality to retrieve information when API endpoints are down(offline) 

2. What was the most useful feature that was added to the latest version of your chosen
language? Please include a snippet of code that shows how you&#39;ve used it.
    I think the most useful is Destructuring, as this makes the code more readable and useful : 
        {listOfBooks.map(({ authorName, cover, publishDate, title }, i) => (
          <div className="card" key={i}>
            <img
              src={cover}
              alt={`${title} book cover image`}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "./imgs/cover.jpg";
                e.target.style.width = "180";
                e.target.style.height = "260px";
              }}
            />
            <div className="container">
              <h3>{title}</h3>
              {authorName.length
                ? authorName.map((name, j) => <p key={j}>{name}</p>)
                : ""}
              {publishDate.length
                ? publishDate.map(
                    (date, j) => j < 3 && <span key={j}>{date} </span>
                  )
                : ""}
            </div>
          </div>
        ))}


3. How would you track down a performance issue in production? Have you ever had to do this?
	I can use the Chrome Performance tab to see what part of the application is running slow then see how to improve that process.

4. How would you improve the API that you just used?
	I would try and make the data more consistent as a lot of information is missing, and I would add more filtering systems for the URL parameters 
5. Please describe yourself using correctly formatted JSON.
	{
	name: "Alexy Kotliar",
	age: 34,
	location: 
		{
			country:"Canada",
			City:"Holland Landing",
			zip: "L9N"
		},
	programing_languages: ['HTML', 'CSS', 'Javascript', 'Python', 'SQL']
	}
