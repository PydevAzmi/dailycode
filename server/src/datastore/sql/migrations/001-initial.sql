

CREATE Table user(
    id serial primary key,
    firstName VARCHAR not null,
    lastName VARCHAR not null,
    username VARCHAR UNIQUE not null,
    email VARCHAR UNIQUE not null,
    password VARCHAR not null,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE Table post (
    id serial primary key,
    title VARCHAR not null,
    url VARCHAR UNIQUE not null,
    userId int not null,
    postedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users (id) ON DELETE CASCADE
);

CREATE Table comment (
    id serial primary key,
    content TEXT not null,
    userId int not null,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users (id) ON DELETE CASCADE
);

CREATE Table like (
    id serial PRIMARY KEY,
    userId int not null,
    postId int not null,
    FOREIGN KEY (userId) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (postId) REFERENCES posts (id) ON DELETE CASCADE
);