-- CREATE FUNCTION swapsmart.update_unread_msg_count() 
--     RETURNS trigger AS $BODY$
--     BEGIN
--         INSERT INTO swapsmart.unread_messages_count (senderID, receiverID, messageCount)
--         VALUES ("hello", "hello", 15);
--     RETURN NEW;
--     END;
--     $BODY$ LANGUAGE plpgsql;




-- CREATE TRIGGER update_unread_messages_count
--     AFTER INSERT ON swapsmart.chat
--     FOR EACH ROW EXECUTE PROCEDURE
--     swapsmart.update_unread_msg_count();

DROP TRIGGER update_unread_messages_count ON swapsmart.chat;
