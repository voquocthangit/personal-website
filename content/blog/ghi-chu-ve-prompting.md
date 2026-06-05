---
title: ghi chú về prompting, từ một dev frontend
date: 2026-06-04
description: vài điều nho nhỏ tôi học được khi nối LLM vào UI thật.
---

mấy tuần vừa rồi tôi cứ loay hoay nối LLM vào các component vue. dưới đây là
những bài học nhỏ cứ lặp đi lặp lại.

## 1. model là một hàm với đầu vào tệ

prompt xấu → output xấu. hãy đối xử với prompt như request body của bất kỳ
API nào khác — có kiểu, được validate, có version. khi có gì đó hỏng, hãy log
*chính xác* chuỗi bạn đã gửi.

## 2. streaming thay đổi UX nhiều hơn cả model

một khung chat có streaming cảm giác như còn sống. cùng một model, đứng sau
một UI "chờ 8 giây rồi đổ ra một bức tường chữ", cảm giác hỏng. hãy dành thời
gian cho cái renderer streaming.

## 3. structured output > free text, gần như luôn luôn

nếu LLM đang feed vào một UI, hãy yêu cầu JSON với schema. ít bất ngờ hơn, dễ
render hơn, dễ test hơn.

```ts
const { object } = await generateObject({
  model,
  schema: z.object({ title: z.string(), tags: z.array(z.string()) }),
  prompt,
})
```

> đường tắt tốt nhất là cái đường mà bạn vẫn đi được lúc 1 giờ sáng.

có gì học thêm sẽ viết tiếp.
