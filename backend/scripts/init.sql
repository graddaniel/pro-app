INSERT INTO accounts (username, passwordHash, email)
VALUES
    ('username1', 'f3f22d82ccf54a92cfc584d9f1531cbf29b11b513f7f68a20a2fa707f3450220', 'user1@example.com'),
    ('username2', 'f3f22d82ccf54a92cfc584d9f1531cbf29b11b513f7f68a20a2fa707f3450220', 'user2@example.com'),
    ('username3', 'f3f22d82ccf54a92cfc584d9f1531cbf29b11b513f7f68a20a2fa707f3450220', 'user3@example.com'),
    ('username4', 'f3f22d82ccf54a92cfc584d9f1531cbf29b11b513f7f68a20a2fa707f3450220', 'user4@example.com'),
    ('username5', 'f3f22d82ccf54a92cfc584d9f1531cbf29b11b513f7f68a20a2fa707f3450220', 'user5@example.com'),
    ('username6', 'f3f22d82ccf54a92cfc584d9f1531cbf29b11b513f7f68a20a2fa707f3450220', 'user6@example.com');

INSERT INTO profiles (name, age, description, role, accountId)
VALUES
    ('Customer 1', 25, 'Description 1', 'customer', 1),
    ('Customer 2', 30, 'Description 2', 'customer', 2),
    ('Customer 3', 35, 'Description 3', 'customer', 3);

INSERT INTO profiles (name, age, description, role, accountId)
VALUES
    ('Professional 1', 40, 'Description 4', 'professional', 4),
    ('Professional 2', 45, 'Description 5', 'professional', 5),
    ('Professional 3', 50, 'Description 6', 'professional', 6);