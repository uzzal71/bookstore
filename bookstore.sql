--
-- PostgreSQL database dump
--

-- Dumped from database version 14.12 (Ubuntu 14.12-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.12 (Ubuntu 14.12-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: authors; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.authors (
    id integer NOT NULL,
    user_id integer,
    name character varying(255),
    bio text,
    birthdate date,
    status boolean DEFAULT true,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.authors OWNER TO postgres;

--
-- Name: authors_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.authors_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.authors_id_seq OWNER TO postgres;

--
-- Name: authors_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.authors_id_seq OWNED BY public.authors.id;


--
-- Name: books; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.books (
    id integer NOT NULL,
    author_id integer,
    title character varying(255),
    description character varying(255),
    published_date date,
    status boolean DEFAULT true,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.books OWNER TO postgres;

--
-- Name: books_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.books_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.books_id_seq OWNER TO postgres;

--
-- Name: books_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.books_id_seq OWNED BY public.books.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(255),
    password character varying(255),
    status boolean DEFAULT true,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: authors id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.authors ALTER COLUMN id SET DEFAULT nextval('public.authors_id_seq'::regclass);


--
-- Name: books id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.books ALTER COLUMN id SET DEFAULT nextval('public.books_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: authors; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.authors (id, user_id, name, bio, birthdate, status, "createdAt", "updatedAt") FROM stdin;
5	10	Mary Shelley	Mary Wollstonecraft Shelley was an English novelist who is best known for writing the Gothic novel Frankenstein; or, The Modern Prometheus, which is considered an early example of science fiction. She also edited and promoted the works of her husband, the Romantic poet and philosopher Percy Bysshe Shelley	2024-07-08	t	2024-07-08 20:45:41.638+06	2024-07-08 20:45:41.638+06
2	7	Jane Austen	Jane Austen was an English novelist known primarily for her six novels, which implicitly interpret, critique, and comment upon the British landed gentry at the end of the 18th century. Austen's plots often explore the dependence of women on marriage for the pursuit of favourable social standing and economic security	2024-07-08	t	2024-07-08 20:44:06.846+06	2024-07-08 20:44:06.846+06
3	8	William Thackeray	William Makepeace Thackeray was an English novelist and illustrator. He is known for his satirical works, particularly his 1847–1848 novel Vanity Fair, a panoramic portrait of British society, and the 1844 novel The Luck of Barry Lyndon, which was adapted for a 1975 film by Stanley Kubrick.	2024-07-08	t	2024-07-08 20:44:38.702+06	2024-07-08 20:48:57.497+06
4	9	Benjamin Disraeli	Benjamin Disraeli, 1st Earl of Beaconsfield, KG, PC, DL, JP, FRS was a British statesman, Conservative politician and writer who twice served as Prime Minister of the United Kingdom. He played a central role in the creation of the modern Conservative Party, defining its policies and its broad outreach	2024-07-08	t	2024-07-08 20:45:10.901+06	2024-07-08 20:45:10.901+06
\.


--
-- Data for Name: books; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.books (id, author_id, title, description, published_date, status, "createdAt", "updatedAt") FROM stdin;
7	4	Frankenstein	Mary Shelley’s first novel has been hailed as a masterpiece of horror and the macabre.	2024-08-08	t	2024-07-08 23:39:30.593+06	2024-07-08 23:39:30.593+06
8	4	Nightmare Abbey	The great pleasure of Nightmare Abbey, which was inspired by Thomas Love Peacock’s friendship with Shelley, lies in the delight the author takes in poking fun at the romantic movement.	2024-08-08	t	2024-07-08 23:39:31.343+06	2024-07-08 23:39:31.343+06
6	3	Emma	Jane Austen’s Emma is her masterpiece, mixing the sparkle of her early books with a deep sensibility	2024-08-08	t	2024-07-08 23:39:03.241+06	2024-07-08 23:39:03.241+06
5	3	Tom Jones	Tom Jones is a classic English novel that captures the spirit of its age and whose famous characters have come to represent Augustan society in all its loquacious, turbulent, comic variety.	2024-08-08	t	2024-07-08 23:39:02.506+06	2024-07-08 23:39:02.506+06
1	2	The Pilgrims Progress	A story of a man in search of truth told with the simple clarity and beauty of Bunyan’s prose make this the ultimate English classic.	2024-08-08	t	2024-07-08 23:37:27.528+06	2024-07-08 23:37:27.528+06
9	4	Jane Eyre	Charlotte Brontë’s erotic, gothic masterpiece became the sensation of Victorian England. Its great breakthrough was its intimate dialogue with the reader.	2024-08-08	t	2024-07-08 23:39:31.942+06	2024-07-08 23:39:31.942+06
4	3	Clarissa	Clarissa is a tragic heroine, pressured by her unscrupulous nouveau-riche family to marry a wealthy man she detests, in the book that Samuel Johnson described as “the first book in the world for the knowledge it displays of the human heart.”	2024-08-08	t	2024-07-08 23:39:01.753+06	2024-07-08 23:39:01.753+06
2	2	Robinson Crusoe	By the end of the 19th century, no book in English literary history had enjoyed more editions, spin-offs and translations. Crusoe’s world-famous novel is a complex literary confection, and it’s irresistible.	2024-08-08	t	2024-07-08 23:38:32.565+06	2024-07-08 23:38:32.565+06
3	2	Gullivers Travels	A satirical masterpiece that’s never been out of print, Jonathan Swift’s Gulliver’s Travels comes third in our list of the best novels written in English	2024-08-08	t	2024-07-08 23:38:36.807+06	2024-07-08 23:38:36.807+06
10	5	Wuthering Heights	Emily Brontë’s windswept masterpiece is notable not just for its wild beauty but for its daring reinvention of the novel form itself.	2024-08-08	t	2024-07-08 23:40:00.976+06	2024-07-08 23:46:41.708+06
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, password, status, "createdAt", "updatedAt") FROM stdin;
9	sujon71	$2b$10$4uLXrktmfmFe/mSqtWvNUu42azTNNKVvgRcKVNEssqLO6JsrF/J2y	t	2024-07-08 20:39:49.826+06	2024-07-08 20:39:49.826+06
10	tapas71	$2b$10$dv0bzNzqnpF7k..BdBjLXubdkctrdcmlEBuueS2uUe9zCU3qMD/0y	t	2024-07-08 20:40:00.589+06	2024-07-08 20:40:00.589+06
8	nasir71	$2b$10$moQyJ1u4ziygDFWhclXwaOX2aUHdssTbSSON9F0grh8WrKgPInG.e	t	2024-07-08 20:39:38.885+06	2024-07-08 20:39:38.885+06
7	uzzal71	$2b$10$DTJDw3zDhcjxVIaYyvSyb.r0IKIdrg35Lx4CbYwlbfiGUm3JB2WkO	t	2024-07-08 15:49:52.208+06	2024-07-08 15:50:19.912+06
\.


--
-- Name: authors_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.authors_id_seq', 5, true);


--
-- Name: books_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.books_id_seq', 12, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 10, true);


--
-- Name: authors authors_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.authors
    ADD CONSTRAINT authors_pkey PRIMARY KEY (id);


--
-- Name: books books_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.books
    ADD CONSTRAINT books_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: authors authors_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.authors
    ADD CONSTRAINT authors_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: books books_author_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.books
    ADD CONSTRAINT books_author_id_fkey FOREIGN KEY (author_id) REFERENCES public.authors(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

