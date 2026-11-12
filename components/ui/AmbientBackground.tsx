/**
 * Fixed decorative layer: drifting aurora blobs behind a masked grid.
 * Pure CSS animation — renders on the server, costs nothing on the client.
 */
export default function AmbientBackground() {
  return (
    <div className="ambient" aria-hidden="true">
      <span
        className="blob h-[42rem] w-[42rem] -left-40 -top-56 bg-accent/25"
        style={{ animationDuration: "26s" }}
      />
      <span
        className="blob h-[34rem] w-[34rem] right-[-10rem] top-32 bg-cyan-500/15"
        style={{ animationDuration: "32s", animationDelay: "-8s" }}
      />
      <span
        className="blob h-[30rem] w-[30rem] left-1/3 top-[120vh] bg-violet-500/10"
        style={{ animationDuration: "38s", animationDelay: "-14s" }}
      />
    </div>
  );
}
