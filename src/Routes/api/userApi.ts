import { Router, RouterContext } from "../../../lib.ts";
import Users from "../../Schema/user.ts";

const router = new Router();

router.get("/", async (ctx) => {
  await Users.find({})
    .then((user) => {
      ctx.response.body = user;
      ctx.response.status = 200;
    })
    .catch((err) => {
      (ctx.response.status = 500),
        (ctx.response.body = { error: "Internal server error" });
      console.error(err);
    });
});

router.post("/new", async (ctx) => {
  const { username, firstName, lastName, jobTitle, address } =
    await ctx.request.body().value;
  if (
    username == null ||
    firstName == null ||
    lastName == null ||
    jobTitle == null ||
    address == null
  ) {
    (ctx.response.status = 400),
      (ctx.response.body = { error: "No valid data provided" });
    return;
  }
  await Users.create({
    username: username,
    firstName: firstName,
    lastName: lastName,
    jobTitle: jobTitle,
    address: address,
  })
    .then((user) => {
      (ctx.response.status = 200),
        (ctx.response.body = { success: "Successfully created" });
      console.log(user);
    })
    .catch((err) => {
      (ctx.response.status = 500),
        (ctx.response.body = { error: "Internal server error" });
      console.error(err);
    });
});

router.get("/:id", async (ctx) => {
  await Users.findById(ctx.params.id)
    .then((user) => {
      (ctx.response.body = user), (ctx.response.status = 200);
      console.log(user);
    })
    .catch((err) => {
      (ctx.response.status = 500),
        (ctx.response.body = { error: "Internal server error" });
      console.error(err);
    });
});

router.put("/update/:id", async (ctx) => {
  const id = ctx.params.id;
  const { username, firstName, lastName, jobTitle, address } =
    await ctx.request.body().value;
  if (
    username == null ||
    firstName == null ||
    lastName == null ||
    jobTitle == null ||
    address == null
  ) {
    (ctx.response.status = 400),
      (ctx.response.body = { error: "No valid data provided" });
    return;
  }
  await Users.findByIdAndUpdate(id, {
    username: username,
    firstName: firstName,
    lastName: lastName,
    jobTitle: jobTitle,
    address: address,
  })
    .then((user) => {
      ctx.response.status = 200;
      ctx.response.body = { message: "Successfully update data" };
    })
    .catch((err) => {
      (ctx.response.status = 500),
        (ctx.response.body = { error: "Internal server error" });
      console.error(err);
    });
});

router.delete("/delete/:id", async (ctx) => {
  await Users.findByIdAndDelete(ctx.params.id)
    .then(() => {
      ctx.response.status = 200;
      ctx.response.body = { success: "Data successfully deleted" };
    })
    .catch((err) => {
      (ctx.response.status = 500),
        (ctx.response.body = { error: "Internal server error" });
      console.error(err);
    });
});

export default router;
