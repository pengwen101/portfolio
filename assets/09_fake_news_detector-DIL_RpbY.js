var e=`# Fake News Detection\r
\r
![alt text](/img/fake_news_detector.png)\r
\r
A voting classifier model built using several classifier models (Logistic Regression, Support Vector Machine, Passive Aggressive Classifier, Decision Tree, Random Forest, Gradient Boosting, and XGBoost) to detect real and fake news. Fake news’ data is fetched from Turnbackhoax.id, while real news’ data is fetched from CNN, Kompas, and Tempo. Achieved a final accuracy of 97,66%, precision 97,69%, recall 97,61%, and F1-score 97,65%. A simple user interface is built using Flask. Users can opt to paste news text or paste the link of the website for convenience. \r
\r
My Contributions:\r
- Cleaned and preprocess data from Turnbackhoax.id, CNN, Kompas, and Tempo, and performed HTML tag removal, URL removal, slang words removal, dan word elongation\r
- Performed an exploratory data analysis on news data\r
- Trained Logistic Regression, Support Vector Machine, and Passive Aggressive Classifier with hyperparameter tuning from seven models that used to create a Voting Classifier to classify news content into real and fake news\r
- Wrote an abstract explaining the data preprocessing part and how the models are trained.\r
\r
Tags=Machine Learning\r
Abstract=https://drive.google.com/file/d/1c5f2tgN5Ne1aSjezE3g1TtoErIZPAjPN/view\r
Github=https://github.com/nathtjan/fake-news-detection`;export{e as default};