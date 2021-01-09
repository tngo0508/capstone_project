import pandas as pd
import pylab as plt
df_train = pd.read_csv('dataset21_01_02-042311.csv')

# perform preprocessing data before they can be used

# removing N/A
df_train_drop_na = df_train.dropna()
# drop Symbol col
p_df = df_train_drop_na.drop(['Symbol', 'target'], axis=1)

# standardize features
sdd_df = ((p_df) - p_df.mean()) / p_df.std()

cmap_df = df_train_drop_na['target'].astype('category')
cmap_df.cat.codes
plt.scatter(
    p_df['open'],
    cmap_df.cat.codes
)

plt.show()
