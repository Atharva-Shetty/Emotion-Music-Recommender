from flask import Flask, Response , request, render_template
import urllib3

from tensorflow.keras.models import load_model
import os
import numpy as np
import cv2
import base64
import json

import tensorflow as tf
from tensorflow.keras.utils import load_img
from werkzeug.utils import secure_filename
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.utils import img_to_array
import pandas as pd
import os
from flask_cors import CORS
df = pd.read_csv('./song_final.csv')
import io


app = Flask(__name__)
CORS(app)

label_dict = {0:'Happy',1:'Neutral',2:'Sad'}
emotion_labels = ['Happy','Neutral', 'Sad']
face_classifier = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
model = load_model('./model_optimal3.h5')

class_names =[ 'happy' , ' neutral' ,'sad' ]
def model_predict(image_path , model):
    filepath = image_path
    img = load_and_prep_image(filepath, scale = True)
    img = np.expand_dims(img,axis = 0) #makes image shape (1,48,48)
    img = img.reshape(1,48,48,1)
    result = model.predict(img)

    return label_dict[np.argmax(result)]
    

    
def get_results(emotion):
  NUM_RECOMMEND=100
  happy_set=[]
  sad_set=[]
  neutral_set = []
  if emotion=="happy":
      #happy_set.append(df[(df['kmeans']==0)&(df['year']>2000)]['song_name' ].head(NUM_RECOMMEND))
      return df[(df['kmeans']==0)&(df['year']>2000)][['song_name' , 'artists' ]].head(NUM_RECOMMEND)
 
  elif emotion=="sad":
      return df[(df['kmeans']==1)&(df['year']>2000)][['song_name' , 'artists' ]].head(NUM_RECOMMEND)
      
      #return sad_set
  else:
      return df[(df['kmeans']==1)&(df['year']>2000)][['song_name' , 'artists' ]].head(NUM_RECOMMEND)
      
def load_and_prep_image(filename, img_shape=48, scale=True):
  
  img = load_img(filename ,target_size = (img_shape,img_shape),color_mode = "grayscale")
  img = np.array(img)
  if scale:

    return img/255.
  else:
    return img


@app.route('/' , methods=['GET'])
def index():
    return render_template('index.html')


@app.route('/', methods=['POST'])
def upload():
    if request.method == 'POST':
        # print(request.get_json())
        
        json1 = request.get_data();
        # string = json[6,json.length]
        # str = json1['image']
        # f = json["imagefile"]
        str = json1.decode()
        base64result = str.split(',')[1];
        decoded_data=base64.b64decode(base64result + '==')
        img_file = open('./images/recieved.jpg', 'wb')
        img_file.write(decoded_data)
        img_file.close()
        
        file_path = './images/recieved.jpg'
      
        # basepath = './images/'
        # file_path = os.path.join(
        #     basepath,  "new.jpg")
        
        # f.save(file_path)
        
        frame = cv2.imread(file_path)
        labels = []
        gray = cv2.cvtColor(frame,cv2.COLOR_BGR2GRAY)
        faces = face_classifier.detectMultiScale(gray)
    
        for (x,y,w,h) in faces:
            cv2.rectangle(frame,(x,y),(x+w,y+h),(0,255,255),2)
            roi_gray = gray[y:y+h,x:x+w]
            roi_gray = cv2.resize(roi_gray,(48,48),interpolation=cv2.INTER_AREA)



        if np.sum([roi_gray])!=0:
            roi = roi_gray.astype('float')/255.0
            roi = img_to_array(roi)
            roi = np.expand_dims(roi,axis=0)

            prediction = model.predict(roi)[0]
            label=emotion_labels[prediction.argmax()]
            label_position = (x,y)
            cv2.putText(frame,label,label_position,cv2.FONT_HERSHEY_SIMPLEX,1,(0,255,0),2)
        else:
            cv2.putText(frame,'No Faces',(30,80),cv2.FONT_HERSHEY_SIMPLEX,1,(0,255,0),2)
        cv2.imwrite("./emotion_image/test.jpg" , frame)
        
        
        arr = get_results(label)
        arr = arr.sample(n=10)
#        arr['artists'] = arr.artists.apply(lambda x: x[0])
        print(arr.dtypes)       
  
        arr.reset_index(drop=True , inplace=True)  
        
        addjson = {"label": label}
        # arr.insert(addjson)
        print(arr)
        
        jso =  arr.to_json()
        
        jso = json.loads(jso)
        
        jso.update(addjson)
        
        jso2 = jso
        
        
       
        response = app.response_class(
        response=json.dumps(jso),
        mimetype='application/json'
        )

        return response
        

if __name__ == '__main__':
    app.run(debug=True)
