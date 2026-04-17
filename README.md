Lighthouse Performance Audit
Assignment - Week 9
Test site: https://raider-test-site.onrender.com/ 

This assignment runs automated Lighthouse (Node.js)to programmatically audit website performance and accessibility.

The script tests multiple URLs and checks whether they meet defined performance thresholds.

Setup:

- Install dependencies: npm install
- Run the audit script: node lighthouse-check.js

Test Configuration

- https://raider-test-site.onrender.com/
- https://practicesoftwaretesting.com
- https://example.com

Thresholds

- Performance ≥ 6o
- Accesibility ≥ 80

Output File

The raw test results are saved in: lighthouse-results.txt

Analysis

- raider-test-site passed all thresholds with excellent performance and accessibility.
- practiceofsoftwaretesting.con failed due to low performance (48<60) despite high accessibility.
- example.com passed all thresholds with strong overall scores.

Evidence

Screenshots of terminal output and test results are included in the project repository.
- lighthouse-result1.png
- lighthouse-result2.png

Note

Some runs may show: "Warning: Chrome temp cleanup failed with EPERM but does not affect results.

FEATURES IMPLEMENTED

- Programmatic Lighthouse audits
- Multiple URL testing
- Threshold-based PASS/FAIL logic
- Detailed console reporting
- Comparison Table
- Error handling for Windows environments
- VS Code AI

Conclusion

The lighthouse audit successfully identifies performance and accessibility issues, including SEO and best practices across mulptiple websites. The defined thresholds help determnine whether a site meets acceptable quality standards.
