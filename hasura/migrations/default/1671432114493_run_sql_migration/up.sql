CREATE VIEW swapsmart.active_chats AS
  SELECT chat."receiverID", COUNT(*)
    FROM swapsmart.chat
    GROUP BY chat."receiverID";
