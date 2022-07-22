CREATE TABLE msg_user (
	id serial4 NOT NULL,
	full_name varchar NOT NULL,
	email varchar NOT NULL,
	"password" varchar NOT NULL,
	CONSTRAINT user_pk PRIMARY KEY (id)
);

CREATE TABLE msg_conversation (
	id serial4 NOT NULL,
	participants jsonb NOT NULL,
	CONSTRAINT conversation_pk PRIMARY KEY (id)
);

CREATE TABLE msg_messages (
	id serial4 NOT NULL,
	conversation_id int4 NOT NULL,
	"content" varchar NOT NULL,
	"read" bool NOT NULL DEFAULT false,
	sender_id int4 NOT NULL,
	sent_at timetz NOT NULL DEFAULT now(),
	CONSTRAINT msg_messages_pk PRIMARY KEY (id),
	CONSTRAINT msg_conversation_fk FOREIGN KEY (conversation_id) REFERENCES public.msg_conversation(id),
	CONSTRAINT msg_sender_fk FOREIGN KEY (sender_id) REFERENCES public.msg_user(id)
);

-- Seed for user
INSERT INTO msg_user (full_name, email, "password")
VALUES
	('Robertus Pajajakng','robertus.pajajakng@gmail.com','letspretendyoucannotseethis'),
	('Rakamin','email@rakamin.com','letspretendyoucannotseethis');

