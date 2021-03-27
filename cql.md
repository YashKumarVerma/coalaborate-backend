# Creating the tables
```sql
use hoohack;


CREATE TABLE user (
    firstname text,
    lastname text,
    email text PRIMARY KEY,
    password text,
    role text
);


CREATE TABLE note (
    name text,
    email text,
    timestamp bigint,
    subject text,
    type text,
    title text,
    body text,
    url text,
    PRIMARY KEY ((email, title))
);

```


