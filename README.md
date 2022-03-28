# SQL SCHEMA

```
create table if not exists group (
    id serial not null primary key,
    description text not null,
    created_at timestamp not null default now();
    updated_at timestamp not null default now();
    deleted_at timestamp;
);

create table if not exists task (
    id serial not null primary key,
    group_id int not null references group(id) on delete cascade,
    description text not null,
    done boolean not null default false,
    assigned_to varchar(255);
    created_at timestamp not null default now();
    updated_at timestamp not null default now();
    deleted_at timestamp;
);
```
