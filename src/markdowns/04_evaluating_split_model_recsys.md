# Comparing Split Strategies, Feedback Types, and Models in Recommender System

![alt text](/img/evaluating_split_model_recsys_1.png)
![alt text](/img/evaluating_split_model_recsys_2.png)

In this project, I conducted a deep dive into the split strategies and evaluation metrics of recommendation systems, with a focus on Collaborative Filtering. I tested various split strategies to address concerns regarding data leakage and evaluation accuracy highlighted in recent literature. Utilizing a full catalog evaluation, I determined that Neural Matrix Factorization with BCE loss performed the best. To combat the cold-start problem, I also implemented a content-based recommendation system using movie features from the TMDB API. The application features a backend built with FastAPI and a React frontend. To improve user experience, the API provides users with specific reasons for each movie recommendation.

Tags=Recommendation System,ML Ops,Deep Learning,Machine Learning,Research
Github=https://github.com/pengwen101/recsys