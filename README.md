# Covid tracking with Oject API

- The application contains two pages,
    -- Home ( All states of India )
    -- Particular state ( one single state of India )

- API fetched through
    -- fetch api call with GET method

- Filters for better UX like,
    -- Search filter
    -- Sort filter
    -- Dependent dropdown filter

- Dependency package
    - React-Router-DOM 
        - This page is used for routing between the pages

- Document structure 
    - Component Module folder
        - component JSX file
        - component CSS stylesheet

    - Config folder
        - API end points

    - Route folder

    - Assests
        - Image files
    
    - Font
        - Product sans bold and light in ttf format

# How it works?

    - The user will land in the home page which contains all state covid details.ie.total, delat, delta7, district
    - The user can switch between the slide carousel to see the data by clicking on any one arrow
    - In first slide, the total result of covid will be displayed and a button is presented to route into new page to see that particular state covid detials on each date
    - In second and third slide, the user can see results of delta and delta7
    - In last slide, there will be a dropdown where user can see the result based on each district
    - After routing into particular state, user will be able to see the covid result on each date

    - In both the pages, there will be search and sort filter for better user experience