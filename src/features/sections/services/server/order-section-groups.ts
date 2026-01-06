import prisma from "@/lib/db";
import { EditSectionGroups } from "../../schemas/edit-section-group-schema";
// import { ContentType } from "@/types/create-course";
// import { createSlug } from "@/features/courses/utils/create-slug";
// import { DbLesson } from "@/types";
export async function updateSectionGroups(req: Request) {
  const data: EditSectionGroups = await req.json();

  try {
    if (data.sectionGroups.length === 0)
      return Response.json(
        { message: "Section groups are missing" },
        { status: 400 }
      );

    const queries = data.sectionGroups.map((sectionGroup, index) => {
      return prisma.sectionGroup.update({
        where: {
          id: sectionGroup.id,
        },
        data: {
          order: index + 1,

          sections: {
            updateMany: sectionGroup.sections.map((section, index) => {
              return {
                where: {
                  id: section.id,
                },
                data: {
                  order: index + 1,
                },
              };
            }),
          },
        },
      });
    });

    await Promise.all(queries);

    return Response.json(
      { message: "Section groups updated successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.log(err instanceof Error ? err.message : err);

    return Response.json(
      { message: "Unable to update section groups", err: err },
      { status: 500 }
    );
  }
}

// async function updateOrCreateSectionGroups(req: Request) {
//   const data: EditSectionGroups = await req.json();

//   try {
//     if (data.sectionGroups.length === 0)
//       return Response.json(
//         { message: "Section groups are missing" },
//         { status: 400 }
//       );

//     await prisma.course.update({
//       where: {
//         id: "",
//       },
//       data: {
//         sectionGroups: {
//           upsert: data.sectionGroups.map((sectionGroup, sqi) => {
//             return {
//               where: {
//                 id: sectionGroup?.id !== "-1" ? sectionGroup.id : undefined,
//               },
//               create: {
//                 title: sectionGroup.title,
//                 slug: createSlug(sectionGroup.title),
//                 order: sqi + 1,
//                 sections: {
//                   create: sectionGroup.sections.map((section, si) => {
//                     return {
//                       title: section.title,
//                       slug: createSlug(section.title),
//                       order: si + 1,
//                       lessons: {
//                         create: (
//                           section as EditSectionGroups["sectionGroups"][number]["sections"][number] & {
//                             lessons: DbLesson[];
//                           }
//                         ).lessons.map((lesson, li) => {
//                           return {
//                             title: lesson.title,
//                             content: lesson.content,
//                             contentType: lesson.contentType,
//                             order: li + 1,
//                             codeStyle: lesson.codeStyle,
//                             videoSource: lesson.videoSource,
//                             quiz: lesson?.quiz
//                               ? {
//                                   create: {
//                                     question: lesson.quiz.question,
//                                     answers: {
//                                       create: lesson.quiz.answers.map(
//                                         (answer) => {
//                                           return {
//                                             isCorrect: answer.isCorrect,
//                                             content: answer.content,
//                                           };
//                                         }
//                                       ),
//                                     },
//                                     explanation: lesson.quiz.explanation,
//                                   },
//                                 }
//                               : undefined,
//                           };
//                         }),
//                       },
//                     };
//                   }),
//                 },
//               },
//               update: {
//                 order: sqi + 1,
//                 showSectionsOnly: sectionGroup.showSectionsOnly,
//                 slug: createSlug(sectionGroup.title),
//                 title: sectionGroup.title,
//                 state: "Indevelopment",
//                 sections: {
//                   update: sectionGroup.sections.map((section, si) => {
//                     return {
//                       where: {
//                         id: section.id,
//                       },
//                       data: {
//                         title: section.title,
//                         slug: createSlug(section.title),
//                         order: si + 1,
//                         lesssons: {
//                           update: (
//                             section as EditSectionGroups["sectionGroups"][number]["sections"][number] & {
//                               lessons: DbLesson[];
//                             }
//                           ).lessons.map((lesson, li) => {
//                             return {
//                               where: {
//                                 id: lesson.id,
//                               },
//                               data: {
//                                 title: lesson.title,
//                                 content: lesson.content,
//                                 contentType: lesson.contentType,
//                                 order: li + 1,
//                                 codeStyle: lesson.codeStyle,
//                                 videoSource: lesson.videoSource,
//                                 quiz: lesson?.quiz
//                                   ? {
//                                       update: {
//                                         where: {
//                                           id: lesson.quiz.id,
//                                         },
//                                         data: {
//                                           question: lesson.quiz.question,
//                                           answers: {
//                                             create: lesson.quiz.answers.map(
//                                               (answer) => {
//                                                 return {
//                                                   isCorrect: answer.isCorrect,
//                                                   content: answer.content,
//                                                 };
//                                               }
//                                             ),
//                                           },
//                                           explanation: lesson.quiz.explanation,
//                                         },
//                                       },
//                                     }
//                                   : undefined,
//                               },
//                             };
//                           }),
//                         },
//                       },
//                     };
//                   }),
//                 },
//               },
//             };
//           }),
//         },
//       },
//     });

//     return Response.json(
//       { message: "Section groups updated successfully" },
//       { status: 200 }
//     );
//   } catch (err) {
//     console.log(err instanceof Error ? err.message : err);

//     return Response.json(
//       { message: "Unable to update section groups", err: err },
//       { status: 500 }
//     );
//   }
// }
