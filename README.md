#                          Emotion-Music-Recommender

A Web Based Project which identifies the emotion of a person through uploaded image and then recommends the music based on the Emotion (Happy , Sad , Neutral).

The project uses React.js for front-end and uses Flask for backend and uses Tensorflow and sklearn for ML and Deep Learning models.




## Demo






https://user-images.githubusercontent.com/94366989/230373072-e9b7057f-d146-41ef-bd46-25ee00c119f5.mp4









## Installation
Clone the project using command

```bash
  git clone https://github.com/Atharva-Shetty/Emotion-Music-Recommender.git
  cd Emotion-Music-Recommender

```
Install React requirements by 
```bash
  npm install

```

    
Install the basic requirements by 

```bash
  pip install -r ./src/Music-Backend/requirements.txt
```


## Deployment

To deploy this project open 2 terminals one for backend and one for frontend in current working directory.

First launch react app by 

```bash
    npm start
```
Then in another terminal to launch backend execute

```bash
    cd ./src/Music-Backend
    python3 main.py
```
The server may take 1-2 minutes to launch if you are not using GPU.



Go to address http://localhost:3000 to see the website

## Screenshots
![2023-04-0616-15](https://user-images.githubusercontent.com/94366989/230368800-1af02a22-2c00-4c81-9f1e-0a935e87a99e.png)

![2023-04-0616-17](https://user-images.githubusercontent.com/94366989/230368885-00b2bf7c-c5cd-44a7-82c5-6ff4d78eab9c.png)





## Technology Used

**Front-End:**

React ,Html , Css 

**Backend:** 

Flask


**ML Libraries:** 

 Sci-kit learn , Numpy , Pandas , Tensorflow
 
 


**Datasets**


https://www.kaggle.com/datasets/msambare/fer2013


https://www.kaggle.com/datasets/ektanegi/spotifydata-19212020/code



## Made by

- Backend and ML by [@Atharva-Shetty](https://www.github.com/Atharva-Shetty)
- Front-End by [@Shashank Tripathi](https://github.com/ShashankIIITN)
