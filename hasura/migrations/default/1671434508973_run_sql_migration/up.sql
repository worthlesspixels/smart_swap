CREATE VIEW swapsmart.unread_message_count AS
  SELECT chat."senderID", users."username" , COUNT(*)
    FROM swapsmart.chat, swapsmart.users
    WHERE users."userID" = chat."receiverID" AND NOT chat."messageRead"
    GROUP BY chat."senderID", users."username";
