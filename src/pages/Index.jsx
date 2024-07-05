import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center">
      <h1 className="text-3xl">Welcome to the Todo App</h1>
      <p>Get started by navigating to your Inbox.</p>
      <Button onClick={() => navigate("/inbox")} className="mt-4">Go to Inbox</Button>
    </div>
  );
};

export default Index;