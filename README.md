# React s3-bucket explorer

Runs in-Browser

Needs:
```
S3_BUCKET = "s3.kiwi.locus";
BUCKET_URL = "s3.kiwi.locus.s3.ap-south-1.amazonaws.com/";
```

Currently only mock tree is done. S3 library is written in ```s3-listing.js``` file

***Issues***
* Left pane shows directories/files listing, Upon click content needs to render in right only for Currently selected file, but all the ones selected previously are shown. **Needs Pub/Sub Component to render CONTENT**

* Integration with S3 library for given Tree-like structure on-click Event.
