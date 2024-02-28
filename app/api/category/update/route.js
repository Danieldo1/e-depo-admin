import { connectDB } from "@/lib/connectDB";
import { Category } from "@/lib/models/Category";



export async function PUT(req){
  await connectDB();
  const updates = await req.json();
    console.log(updates, "order");
   const bulkOps = updates.map((item, index) => ({
     updateOne: {
       filter: { _id: item._id },
       update: { $set: { order: index } },
     },

   }));

   const result = await Category.bulkWrite(bulkOps);

    return Response.json(result);
}

