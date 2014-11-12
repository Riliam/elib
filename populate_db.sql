begin transaction;
  insert into book (id, title) values (1, "Python Cookbook");
  insert into book (id, title) values (2, "Learning Python");
  insert into book (id, title) values (3, "Python Pocket Reference");
  insert into book (id, title) values (4, "Code Complete");
end transaction;

begin transaction;
  insert into author (id, name) values (1, "Brian K. Jones");
  insert into author (id, name) values (2, "David Beazley");
  insert into author (id, name) values (3, "Mark Lutz");
  insert into author (id, name) values (4, "Steve McConnell");
end transaction;
