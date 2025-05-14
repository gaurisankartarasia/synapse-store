// "use client";

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { auth, signOut } from "@/lib/firebaseClient";
// import { Spinner } from "@/components/ui/spinner";
// import Image from "next/image";

// const SignOutPage = () => {
//   const router = useRouter();

//   useEffect(() => {
//     const signout = async () => {
//       try {
//         await signOut(auth);
//         const res = await fetch("/api/v1/auth/signout", {
//           method: "POST",
//         });

//         if (res.ok) {
//           window.location.href = "/signin";
//           router.replace("/signin");
//         }
//       } catch (error) {
//         console.error("Error signing out:", error);
//       }
//     };

//     signout();
//   }, [router]);

//   return (
//     <section className="flex items-center justify-center  lg:mr-68 sm:mr-0">
//       <div>
       
//         <div className="flex items-center justify-center">
//           {" "}
//           <Spinner />
//         </div>

//         <p className="text-center">Signing out...</p>
//       </div>
//     </section>
//   );
// };

// export default SignOutPage;



"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth, signOut } from "@/lib/firebaseClient";

const SignOutPage = () => {
  const router = useRouter();

  useEffect(() => {
    const signout = async () => {
      try {
        await signOut(auth);
        const res = await fetch("/api/v1/auth/signout", {
          method: "POST",
        });

        if (res.ok) {
          window.location.href = "/signin";
        }
      } catch (error) {
        console.error("Error signing out:", error);
      }
    };

    signout();
  }, [router]);

  return (
    <section className="py-20 flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="loader" />
      </div>

      <style jsx>{`
        .loader {
          width: fit-content;
          font-weight: bold;
          font-family: monospace;
          font-size: 25px;
          clip-path: inset(0 3ch 0 0);
          animation: l4 1s steps(4) infinite;
        }
        .loader:before {
          content: "Logging out...";
        }
        @keyframes l4 {
          to {
            clip-path: inset(0 -1ch 0 0);
          }
        }
      `}</style>
    </section>
  );
};

export default SignOutPage;
