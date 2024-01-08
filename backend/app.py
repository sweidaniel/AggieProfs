import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error

# Load your data
data = pd.read_csv('/Users/binhdocao/Documents/AggieProfs/backend/cleaned-data.csv')

# Define the scoring metric
data['Goodness_Score'] = (data['A'] * w1 + data['B'] * w2 - data['Q'] * w3 + data['Reported_GPA'] * w4)

# Normalize the score by the total registered students
data['Goodness_Score'] /= data['Total_Registered']

# Prepare the data for the model
X = data.drop(['Goodness_Score', 'Instructor'], axis=1)
y = data['Goodness_Score']

# Normalize features
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, random_state=42)

# Initialize the model
model = RandomForestRegressor(random_state=42)

# Train the model
model.fit(X_train, y_train)

# Predict on the testing set
y_pred = model.predict(X_test)

# Evaluate the model
print(f"Mean Squared Error: {mean_squared_error(y_test, y_pred)}")

# To predict the 'Goodness_Score' for new data, you would scale the new data and use model.predict()
