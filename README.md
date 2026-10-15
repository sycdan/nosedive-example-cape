# nosedive-example-cape

An example cape: the smallest repo that extends [nosedive](https://nosedive.dev) with an action of its own, and a sandbox for trying out how capes work. [nosedive-example-base](https://github.com/sycdan/nosedive-example-base) is the repo that uses it.

It adds one action, `nosedive greet <who>`, which greets someone and says which bridge it ran in. To do that it calls one of nosedive's own functions, so it shows the whole round trip: a doc, the code it names, a test, and an import from nosedive's core.

> nosedive's core is not published yet, so this repo is for reading until it is.

## Start from the docs

Every action is a kb doc, and the doc names its code: everything with code lives in `src/i<id>.ts`, its implementation, and the doc's kind says its signature. Read [the root](kb/01a138bd-9254-76de-b25c-7b412eaa7df3.md) first, not `src/`.

| | |
|---|---|
| [`.nosedive/config.yaml`](.nosedive/config.yaml) | Where its kb is, and its root. |
| [The root](kb/01a138bd-9254-76de-b25c-7b412eaa7df3.md) | `kind: cape`, which is what makes this repo a cape, and its name is the cape's. It links the `greet` action, and core's `cape-tests-pass` as its test gate. |
| [`greet`](kb/01a1337c-83b8-7911-9678-af3ef9aae73e.md) | The action: its usage, `greet <who>`, and links to the files below. |
| [`src/i01a1337c….ts`](src/i01a1337c83b879119678af3ef9aae73e.ts) | The action's code, named for its doc's id. It takes the usage the command line matched, and calls that usage's implementation. |
| [`src/i2e78b4e4….ts`](src/i2e78b4e4a83558c980b15966807a88ed.ts) | The implementation of the `greet <who>` usage, named for the usage's id. It imports core's `find-bridge` by its id, `i01a1335485c…`, from `nosedive-core`. |
| [`test/t2e78b4e4….test.ts`](test/t2e78b4e4a83558c980b15966807a88ed.test.ts) | That usage's test. |

### Where the usage's id comes from

`2e78b4e4…` is the usage's id: a hash of the usage's text, `greet <who>`, in the action doc's id. You never work it out yourself. `nosedive scaf` writes the implementation and test files under it, and the entrypoint's case for it, and lists them in the doc's `## Code` section. Because the id is a hash of the text, rewording a usage gives it a new id: its files must move with it, so a usage never changes without anyone noticing.

## Using it

From a base, a repo nosedive is used from, add it by its remote. [nosedive-example-base](https://github.com/sycdan/nosedive-example-base) is one, set up exactly like this:

```sh
nosedive cape https://github.com/sycdan/nosedive-example-cape.git
nosedive greet ann                      # hello ann, from <the base's folder>
nosedive test nosedive-example-cape     # checks it out in the workspace and runs its test gate
```

`cape` registers this repo under its root's name, builds it, and lists it in the base's config:

```yaml
# .nosedive/config.yaml
capes:
  - nosedive-example-cape
```

A cape is built against the exact core that is running and refuses any other, so after upgrading nosedive, `seed` builds it again.

## Making your own

Start a repo with `nosedive seed --root-kind cape`, mint an action doc with usages in its kb, and run `nosedive scaf`: it writes the files the doc calls for, and the check refuses anything the docs and files disagree on.

`tsconfig.json` finds nosedive's types in a sibling checkout of nosedive-core, so `npm run typecheck` works only beside one for now.
