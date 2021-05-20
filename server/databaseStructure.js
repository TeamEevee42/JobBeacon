CREATE TABLE remote (
	_id serial NOT NULL PRIMARY KEY,
	description varchar(255) NOT NULL
);

CREATE TABLE commitment (
	_id serial NOT NULL PRIMARY KEY,
	description varchar(255) NOT NULL
);

CREATE TABLE status (
	_id serial NOT NULL PRIMARY KEY,
	description varchar(255) NOT NULL
);

CREATE TABLE saved_job (
	_id serial NOT NULL PRIMARY KEY,
	user_id int NOT NULL REFERENCES "user"(_id),
	job_id int NOT NULL REFERENCES job_listing(_id),
	status_id int NOT NULL REFERENCES status(_id),
	favorite BOOLEAN NOT NULL
);

CREATE TABLE public.city
(
    _id integer NOT NULL DEFAULT nextval('city__id_seq'::regclass),
    city_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT city_pkey PRIMARY KEY (_id),
    CONSTRAINT unique_city UNIQUE (city_name)
)
  WITH (
      OIDS = FALSE
  )
  TABLESPACE pg_default;

  ALTER TABLE public.city
      OWNER to wthjchvs;

// job_tech
CREATE TABLE public.job_tech
(
    _id integer NOT NULL DEFAULT nextval('job_tech__id_seq'::regclass),
    job_id integer NOT NULL,
    tech_id integer NOT NULL,
    CONSTRAINT job_tech_pkey PRIMARY KEY (_id),
    CONSTRAINT job_tech_job_id_fkey FOREIGN KEY (job_id)
        REFERENCES public.job_listing (_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT job_tech_tech_id_fkey FOREIGN KEY (tech_id)
        REFERENCES public.tech (_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

// Table note
CREATE TABLE public.note
(
    _id integer NOT NULL DEFAULT nextval('note__id_seq'::regclass),
    description character varying(1000) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT note_pkey PRIMARY KEY (_id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.note
    OWNER to wthjchvs;

// seniority
CREATE TABLE public.seniority
(
    _id integer NOT NULL DEFAULT nextval('seniority__id_seq'::regclass),
    description character varying(255) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT seniority_pkey PRIMARY KEY (_id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.seniority
    OWNER to wthjchvs;

// Tech
CREATE TABLE public.tech
(
    _id integer NOT NULL DEFAULT nextval('tech__id_seq'::regclass),
    name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT tech_pkey PRIMARY KEY (_id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.tech
    OWNER to wthjchvs;

// Mock Data

INSERT INTO commitment (description)
VALUES
	('full-time'),
	('part-time');

SELECT * FROM public.commitment
  ORDER BY _id ASC;

INSERT INTO remote (description)
VALUES
  ('in-person'),
  ('remote'),
  ('COVID-remote');

INSERT INTO status (description)
VALUES
  ('Not applied'),
  ('Applied'),
  ('1st interview'),
  ('2nd interview'),
  ('3rd interview'),
  ('4th interview'),
  ('Offered'),
  ('Denied'),
  ('Accepted');

INSERT INTO users (username, user_password)
VALUES
  ('Mo', 'Hmaidi'),
  ('Tobey', 'Forsman'),
  ('JC', 'Fernandez'),
  ('Joe', 'Bigelow');

CREATE TABLE seniority (
  _id serial NOT NULL PRIMARY KEY,
  description VARCHAR(255) NOT NULL
);

INSERT INTO seniority (description)
VALUES
	('intern'),
	('junior'),
	('mid'),
	('senior'),
	('VP'),
	('CTO'),
	('CEO');

