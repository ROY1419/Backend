import autocannon from "autocannon";

const urls = ['http://localhost:3000', 'http://localhost:3000/stress-test']
const duration = 30;

urls.forEach(url => {
    const instance = autocannon({
        url,
        duration,
    }, (err, res) => {
        try {
            console.log(`URL: ${url}`);
            console.log('Number of Request:', res.requests.total);
            console.log('Duration(Second):', res.duration);
        } catch (error) {
            console.error('Error', err);
        }
    });
    autocannon.track(instance, {renderProgressBar: false, renderResultsTable:false})
})



