import { NodeType } from "../../types";
export function createTreeMockData(): NodeType[] {
  return [
    {
      key: "1",
      title: "شرکت چارگون",
      users: [],
      children: [
        {
          key: "2",
          title: "یاور کاردوست(مدیرعامل)",
          parentKey: "1",
          hierarchy: ["1", "2"],
          users: [
            {
              title: "superadmin",
              isDefault: true,
            },
          ],
          accesses: ["1", "2"],
          children: [
            {
              key: "3",
              title: "محسن پاکدل(مدیرفنی)",
              parentKey: "2",
              hierarchy: ["1", "2", "3"],
              users: [
                {
                  title: "admin",
                  isDefault: true,
                },
              ],
              children: [
                {
                  key: "4",
                  title: "علیرضا گلزاده(کارشناس رابط کاربری)",
                  parentKey: "3",
                  hierarchy: ["1", "2", "3", "4"],
                  users: [
                    {
                      title: "alireza",
                      isDefault: true,
                    },
                    {
                      title: "alirezatest",
                      isDefault: false,
                    },
                  ],
                  children: [],
                  accesses: ["1", "3"],
                },
              ],
              accesses: [],
            },
            {
              key: "8",
              title: "حسین خالقی",
              parentKey: "3",
              hierarchy: ["1", "2", "3"],
              users: [
                {
                  title: "alireza",
                  isDefault: true,
                },
              ],
              children: [],
              accesses: ["3"],
            },
          ],
        },
      ],
      accesses: [],
      parentKey: "0",
      hierarchy: ["1"],
    },
  ];
}
