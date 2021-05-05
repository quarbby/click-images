### Installation
1. Install Node 

2. In click-image, run `npm install`

3. In click-image-flask, add a `data` folder and put the data there. 

- This is configured for the following folders: `test1`, `dfgan_nlvr2_netG_120`, `dfgan-nlvr2_img0caption_baseline`

4. You will need `sqlite-browser` to view the annotations in click-image-flask/labels.db

### Starting Up
1. In click-image, run `npm start`
   
2. In click-image-flask, run `python server.py`

3. Mount a python image server directly in your `data` folder: `python -m http.server 8000`

4. Access the browser webpage at `http://localhost:3000`