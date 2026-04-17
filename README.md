Lighthouse Performance Audit
Assignment - Week 9
Test site: https://raider-test-site.onrender.com/ 

THis assignment runs automated Lighthouse audits using Node.js to evaluate https://raider-test-site.onrender.com/.

The script tests multiple URLs and checks whether they meet defined performance thresholds.

Tools Used:

- Node.js
- Lighthouse (Node module)
- Chrome Launcher

Test Configuration

- https://raider-test-site.onrender.com/
- https://practicesoftwaretesting.com
- https://example.com

Thresholds

- Performance ≥ 6o
- Accesibility ≥ 80

How to Run

node lighthouse_check.js

Output File

The raw test results are saved in: lighthouse-results.txt

Analysis

- raider-test-site passed all thresholds with excellent performance and accessibility.
- practiceofsoftwaretesting.con failed due to low performance (48) despite high accessibility.
- example.com passed all thresholds with strong overall scores.

Evidence

Terminal Output
- lighthouse-result1.png
- lighthouse-result2.png

Conclusion

The lighthouse audit successfully identifies performance and accessibility issues across mulptiple websites. The defined thresholds help determnine whether a site meets acceptable quality standards.
