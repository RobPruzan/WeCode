import React from 'react';
import { Card } from 'react-bootstrap';
export const MessageOption = () => {
  return (
    <Card className="message">
      <Card.Body>
        <Card.Title>Card Title</Card.Title>

        <Card.Text>Hey I'm leaving you.</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default MessageOption;
