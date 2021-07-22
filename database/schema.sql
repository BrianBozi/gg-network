set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "users" (
	"userId" serial NOT NULL,
	"firstName" TEXT NOT NULL,
	"lastName" TEXT NOT NULL,
	"email" TEXT,
	"password" TEXT,
	"gamerTag" TEXT NOT NULL,
	"picture" TEXT,
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "posts" (
	"postId" serial NOT NULL,
	"description" TEXT,
	"photo" TEXT,
	"video" TEXT,
	"content" TEXT,
	"userId" integer NOT NULL,
	CONSTRAINT "posts_pk" PRIMARY KEY ("postId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "postsLiked" (
	"postId" integer NOT NULL,
	"userId" integer NOT NULL,
	"liked" BOOLEAN NOT NULL,
	CONSTRAINT "postsLiked_pk" PRIMARY KEY ("postId","userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "followers" (
	"followerId" integer NOT NULL,
	"followingUserId" integer NOT NULL,
	"followedUsersId" integer NOT NULL,
	"follows" BOOLEAN NOT NULL,
	CONSTRAINT "followers_pk" PRIMARY KEY ("followerId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "comments" (
	"commentId" serial NOT NULL,
	"comment" TEXT NOT NULL,
	"userId" integer NOT NULL,
	"postId" serial NOT NULL,
	CONSTRAINT "comments_pk" PRIMARY KEY ("commentId")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "posts" ADD CONSTRAINT "posts_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");

ALTER TABLE "postsLiked" ADD CONSTRAINT "postsLiked_fk0" FOREIGN KEY ("postId") REFERENCES "posts"("postId");
ALTER TABLE "postsLiked" ADD CONSTRAINT "postsLiked_fk1" FOREIGN KEY ("userId") REFERENCES "users"("userId");

ALTER TABLE "followers" ADD CONSTRAINT "followers_fk0" FOREIGN KEY ("followingUserId") REFERENCES "users"("userId");
ALTER TABLE "followers" ADD CONSTRAINT "followers_fk1" FOREIGN KEY ("followedUsersId") REFERENCES "users"("userId");

ALTER TABLE "comments" ADD CONSTRAINT "comments_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "comments" ADD CONSTRAINT "comments_fk1" FOREIGN KEY ("postId") REFERENCES "posts"("postId");
