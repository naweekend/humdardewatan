import db from "../../db";
import { messagesTable } from "../../db/schema";

export const prerender = false;

export const POST = async ({ request }) => {
  try {
    // Parse JSON body
    const data = await request.json();

    console.log("Form Data Received:", data); // Logs { name, email, message }

    await db.insert(messagesTable).values(data);

    // Basic validation
    if (!data.name || !data.email || !data.message) {
      return new Response(
        JSON.stringify({ success: false, error: "All fields are required." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Return success response
    return new Response(
      JSON.stringify({ success: true, message: "Form received successfully." }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error handling form:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Internal server error." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
