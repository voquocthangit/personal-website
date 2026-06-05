---
title: chào, thế giới
date: 2026-06-05
description: bài đầu tiên — tại sao mình lập cái blog này và mình muốn viết về cái gì.
---

vậy là, đây là bài đầu tiên.

mình viết vue và css được vài năm rồi, và dạo gần đây mình thấy mình dành ngày
càng nhiều thời gian ở phía bên kia màn hình — nói chuyện với LLM, dựng vài
agent nho nhỏ, cố tìm xem cái "AI stuff" này thực sự hữu ích ở đâu, và đâu chỉ
là trò vui.

cái blog này sẽ là nơi mình ghi lại tất cả những thứ đó. không phải tutorial,
không phải nhận định nóng hổi. chủ yếu là ghi-chú-cho-chính-mình — kiểu thứ
mình muốn tìm thấy trên blog của ai đó lúc 1 giờ sáng.

## kỳ vọng

- bài ngắn. một ý mỗi bài.
- demo mình tự dựng để hiểu một thứ gì đó
- thỉnh thoảng càm ràm về DX

## tech stack

site này được dựng bằng **nuxt 3** và **@nuxt/content** — nên mỗi bài viết
chỉ là một file markdown trong một thư mục. đó là toàn bộ CMS.

```ts
const { data: posts } = await useAsyncData('blog', () =>
  queryContent('/blog').sort({ date: -1 }).find()
)
```

> blog tốt nhất là cái blog mà bạn thực sự sẽ đăng bài lên.

hẹn gặp lại sớm.
