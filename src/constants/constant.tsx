export const myCode = `
import numpy as np
import pandas as pd
from sklearn import preprocessing
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.model_selection import train_test_split
from keras.models import Sequential
from keras.layers import Dense

# Load data
data = pd.read_csv('KDDTrain+.csv');

columns = ["duration", "protocol_type", "service", "flag", "src_bytes", "dst_bytes", "land", "wrong_fragment", "urgent",
           "hot", "num_failed_logins", "logged_in", "num_compromised", "root_shell", "su_attempted", "num_root",
           "num_file_creations", "num_shells", "num_access_files", "num_outbound_cmds", "is_host_login",
           "is_guest_login", "count", "srv_count", "serror_rate", "srv_serror_rate", "rerror_rate", "srv_rerror_rate",
           "same_srv_rate", "diff_srv_rate", "srv_diff_host_rate", "dst_host_count", "dst_host_srv_count",
           "dst_host_same_srv_rate", "dst_host_diff_srv_rate", "dst_host_same_src_port_rate",
           "dst_host_srv_diff_host_rate", "dst_host_serror_rate", "dst_host_srv_serror_rate", "dst_host_rerror_rate",
           "dst_host_srv_rerror_rate", "attack", "last_flag"]

data.columns = columns

# Split dataset into features (X) and the target variable (y)
X = data.drop('attack', axis=1)
y = data['attack']

label_encoder = preprocessing.LabelEncoder()
y = label_encoder.fit_transform(y)

# Perform one-hot encoding on categorical variables
categorical_columns = ["protocol_type", "service", "flag"]
encoder = OneHotEncoder(sparse=False, handle_unknown='ignore')
X_encoded = pd.DataFrame(encoder.fit_transform(X[categorical_columns]))
X_encoded.columns = encoder.get_feature_names_out(categorical_columns)
X = X.drop(categorical_columns, axis=1)
X = pd.concat([X, X_encoded], axis=1)

# Convert columns to appropriate data types
X = X.astype(float, errors='raise')  # Convert all columns to float data type

# Check for non-numeric values
non_numeric_columns = X.columns[~np.isfinite(X).all()]
non_numeric_rows = X[~np.isfinite(X).all(axis=1)]

# Standardize the features using StandardScaler
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Split dataset into training set and test set
X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.3, random_state=42)

num_features = X_train.shape[1]  # Number of features after one-hot encoding

# Define the number of output classes
num_classes = len(np.unique(y_train))

# Create the neural network model
model = Sequential()
model.add(Dense(32, input_dim=num_features, activation='relu'))
model.add(Dense(16, activation='relu'))
model.add(Dense(8, activation='relu'))
model.add(Dense(num_classes, activation='softmax'))

model.compile(loss='sparse_categorical_crossentropy', optimizer='adam', metrics=['accuracy'])
model.fit(X_train, y_train, epochs=10, batch_size=32)


# Collect user input data
user_data={
   "duration": 0,
   "protocol_type": "tcp",
   "service": "private",
   "flag": "REJ",
   "src_bytes": 0,
   "dst_bytes": 0,
   "land": 0,
   "wrong_fragment": 0,
   "urgent": 0,
   "hot": 0,
   "num_failed_logins": 0,
   "logged_in": 0,
   "num_compromised": 0,
   "root_shell": 0,
   "su_attempted": 0,
   "num_root": 0,
   "num_file_creations": 0,
   "num_shells": 0,
   "num_access_files": 0,
   "num_outbound_cmds": 0,
   "is_host_login": 0,
   "is_guest_login": 0,
   "count": 229,
   "srv_count": 10,
   "serror_rate": 0,
   "srv_serror_rate": 0,
   "rerror_rate": 1,
   "srv_rerror_rate": 1,
   "same_srv_rate": 0.04,
   "diff_srv_rate": 0.06,
   "srv_diff_host_rate": 0,
   "dst_host_count": 255,
   "dst_host_srv_count": 10,
   "dst_host_same_srv_rate": 0.04,
   "dst_host_diff_srv_rate": 0.06,
   "dst_host_same_src_port_rate": 0,
   "dst_host_srv_diff_host_rate": 0,
   "dst_host_serror_rate": 0,
   "dst_host_srv_serror_rate": 0,
   "dst_host_rerror_rate": 1,
   "dst_host_srv_rerror_rate": 1,
   "last_flag": 21
 }

# Create a DataFrame from user input data
user_df = pd.DataFrame([user_data])

# user_df['attack'] = label_encoder.transform(user_df['attack'])
# Perform the same preprocessing steps as the training data
user_encoded = pd.DataFrame(encoder.transform(user_df[categorical_columns]))
user_encoded.columns = encoder.get_feature_names_out(categorical_columns)
user_df = user_df.drop(categorical_columns, axis=1)
user_df = pd.concat([user_df, user_encoded], axis=1)
user_df = user_df.astype(float, errors='raise')
user_scaled = scaler.transform(user_df)

# Make predictions on the user data
user_pred = model.predict(user_scaled)
user_pred_label = np.argmax(user_pred, axis=1)
user_pred_label = label_encoder.inverse_transform(user_pred_label)


print("Predicted label: %s" % user_pred_label[0])
`