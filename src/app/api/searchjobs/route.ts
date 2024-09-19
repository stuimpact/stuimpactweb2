import { NextResponse } from 'next/server';
import { chromium } from 'playwright';

// Handle POST requests
export async function POST(req: Request) {
    try {
        const body = await req.json();
        let { interest, grade, page = 1 } = body; // Default to page 1 if not provided

        if (!interest || !grade) {
            return NextResponse.json({ error: 'Interest and grade are required.' }, { status: 400 });
        }

        // Convert 'Freshman' to grade '9' if necessary
        const gradeMap = {
            'freshman': '9',
            'sophomore': '10',
            'junior': '11',
            'senior': '12',
        };
        grade = gradeMap[grade.toLowerCase()] || grade;

        // Supported interests and grades
        const interests = [
            'Science', 'Arts', 'Education', 'Engineering', 'Medicine',
            'Computer Science', 'Business', 'Writing', 'Government', 'Law/Advocacy'
        ];
        const grades = ['9', '10', '11', '12'];

        // Validate interest and grade
        if (!interests.includes(interest) || !grades.includes(grade)) {
            return NextResponse.json({ error: 'Invalid interest or grade.' }, { status: 400 });
        }

        // Determine the URL based on the page number
        let url = `https://www.teenlife.com/global-search-page/?keyword=${encodeURIComponent(interest)}`;
        switch (page) {
            case 2:
                url += '&program-type=summer';
                break;
            case 3:
                url += '&program-type=enrichment';
                break;
            case 4:
                url += '&program-type=volunteer';
                break;
            case 5:
                url += '&program-type=gap';
                break;
            default:
                url += `&page=${page}`; // Default for the first page or other authpage
        }

        // Scrape the data
        try {
            const browser = await chromium.launch();
            const pageInstance = await browser.newPage();

            // Set a timeout for page navigation
            await pageInstance.goto(url, { timeout: 15000 }); // 15 seconds timeout

            // Scrape the information from the articles
            const articles = await pageInstance.$$eval('article', elements =>
                elements.map(article => {
                    const title = article.querySelector('.program-heading a')?.textContent || '';
                    const description = article.querySelector('.description')?.textContent || '';
                    const url = article.querySelector('.program-heading a')?.getAttribute('href') || '';
                    const imgSrc = article.querySelector('img')?.getAttribute('src') || '';

                    return {
                        title,
                        description,
                        url,
                        imgSrc,
                    };
                })
            );

            // Close the browser and return the scraped data
            await browser.close();
            return NextResponse.json({ articles }, { status: 200 });
        } catch (error) {
            console.error('Error scraping data:', error);
            return NextResponse.json({ error: 'Failed to scrape data.' }, { status: 500 });
        }
    } catch (error) {
        console.error('Error handling request:', error);
        return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
    }
}
