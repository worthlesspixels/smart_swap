CREATE FUNCTION swapsmart.update_unread_msg_count() 
    RETURNS trigger AS $BODY$
    BEGIN
        UPDATE swapsmart.unread_messages_count 
        SET "messageCount" = "messageCount" + 1
        WHERE "senderID" = NEW."senderID"
        AND "receiverID" = NEW."receiverID";
        
        INSERT INTO swapsmart.unread_messages_count
        SELECT NEW."senderID", NEW."receiverID", 1
        WHERE NOT EXISTS (SELECT 1 FROM swapsmart.unread_messages_count 
        WHERE "senderID" = NEW."senderID" AND "receiverID" = NEW."receiverID");
    RETURN NEW;
    END;
    $BODY$ LANGUAGE plpgsql;




CREATE TRIGGER update_unread_messages_count
    AFTER INSERT ON swapsmart.chat
    FOR EACH ROW EXECUTE PROCEDURE
    swapsmart.update_unread_msg_count();
