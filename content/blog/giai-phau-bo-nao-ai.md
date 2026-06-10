---
title: giải phẫu một bộ não AI
date: 2026-06-06
description: mọi thứ bạn cần biết về cách ChatGPT và các LLM thực sự hoạt động — từ dữ liệu thô đến trí tuệ nhân tạo.
---

> **Nguồn:** Tổng hợp từ video "Deep Dive into LLMs like ChatGPT" của **Andrej Karpathy** (Feb 2025, ~3h 22m) — đồng sáng lập OpenAI, cựu Sr. Director of AI tại Tesla.

## 1. LLM học từ đâu? Internet nguyên bản

Mọi thứ bắt đầu từ dữ liệu. Không phải dữ liệu được chọn lọc, không phải sách giáo khoa — mà là toàn bộ internet được thu thập thô, lọc, và nén lại.

Nguồn đến từ Common Crawl (bản chụp web định kỳ), GitHub, Wikipedia, sách số, diễn đàn Stack Overflow, và hàng trăm nguồn khác — tổng cộng hàng chục nghìn tỉ tokens, tương đương hàng chục triệu cuốn sách.

Trước khi đưa văn bản vào mạng nơ-ron, nó cần được **tokenize** — chuyển thành các đơn vị số nhỏ hơn gọi là *token*. Một token thường là một từ hoặc một mảnh của từ:

```
"unhappiness"  →  ["un", "happi", "ness"]        → 3 tokens
"ChatGPT"      →  ["Chat", "G", "PT"]            → 3 tokens
"Xin chào"     →  ["X", "in", " ch", "ào"]       → tiếng Việt tốn nhiều token hơn tiếng Anh
```

Điều quan trọng: **mô hình không hiểu từ, nó hiểu tokens.** Đây là lý do LLM đôi khi "mù" với việc đếm ký tự hay xử lý chính tả — vì nó không bao giờ thực sự nhìn thấy từng chữ cái riêng lẻ.

## 2. Pretraining — giai đoạn mô hình "nuốt" tri thức

Sau khi có dữ liệu và tokens, bắt đầu quá trình huấn luyện. Nhiệm vụ đơn giản đến bất ngờ:

> *Cho trước một chuỗi tokens, hãy đoán token tiếp theo.*

Lặp đi lặp lại hàng nghìn tỉ lần, trên hàng nghìn GPU trong nhiều tháng, mô hình buộc phải học *mọi thứ* để đoán đúng: ngữ pháp, logic, lập trình, toán học, văn học, lịch sử... Đây gọi là **pretraining**.

Kết quả là một **base model** — không phải chatbot, chỉ là một "máy dự đoán văn bản" cực kỳ thông minh. Nếu bạn cho nó câu *"Con mèo ngồi trên..."* — nó tiếp tục hợp lý, nhưng không nhất thiết trả lời theo kiểu hội thoại.

### Cơ chế Attention — xem ai đang chú ý tới ai

Đây là trái tim của kiến trúc Transformer. Khi xử lý từ "sat" trong câu *"The cat sat on the mat"*, mô hình tính xem từ đó nên "chú ý" tới những từ nào với mức độ bao nhiêu. Thay vì đọc tuần tự từ trái sang phải, mỗi token có thể kéo thông tin từ bất kỳ token nào khác trong ngữ cảnh.

```
  Layer 3 ─────────────────────────────────
  Layer 2 ─────────────────────────────────
  Layer 1 ─────────────────────────────────
               ▲    ▲      ▲      ▲    ▲
              the   cat  [sat]   on   mat
                          ▲
                    token đang xử lý

  Độ dày đường = trọng số attention
  "sat" chú ý mạnh nhất vào chính nó, sau đó là "on", "cat", ...
```

Mô hình tự học cách phân bổ attention qua quá trình training — không ai lập trình cứng điều này.

Một điểm Karpathy nhấn mạnh: **mô hình cần tokens để suy nghĩ.** Nếu yêu cầu trả lời ngay lập tức chỉ bằng một từ — kết quả sẽ tệ hơn nhiều so với khi để mô hình "viết ra từng bước". Đây là cơ sở của kỹ thuật *chain-of-thought prompting*.

> *"Models need tokens to think. Forcing an immediate answer is like asking someone to solve calculus in their head without paper."*

## 3. Post-training — biến "cỗ máy đoán chữ" thành trợ lý

Base model sau pretraining thực chất chỉ là một "papeggio kỹ thuật số" — nó bắt chước mọi văn bản trên internet, kể cả những nội dung xấu. Để tạo ra ChatGPT, cần thêm hai bước.

### Bước 1: Supervised Fine-tuning (SFT)

Thuê hàng trăm người viết hội thoại mẫu theo định dạng: *Người dùng hỏi → Trợ lý trả lời lý tưởng*. Khoảng 100.000–1 triệu mẫu như vậy được dùng để fine-tune lại base model.

**Điểm mạnh:** đơn giản, dễ kiểm soát, hiệu quả cao với dữ liệu chất lượng tốt.

**Điểm yếu:** giới hạn bởi khả năng của người viết mẫu. Mô hình không thể vượt qua chất lượng dữ liệu mà nó học. Tốn kém để thu thập dữ liệu tốt ở quy mô lớn.

### Bước 2: Reinforcement Learning from Human Feedback (RLHF)

Đây là bước tinh tế hơn — và là nơi RLHF và RL thuần túy cần được phân biệt rõ.

Trong **RLHF**, người đánh giá không viết câu trả lời mẫu nữa. Thay vào đó, họ so sánh hai câu trả lời của mô hình và chọn cái tốt hơn. Từ hàng chục nghìn so sánh A/B này, một **reward model** được xây dựng — một bộ phán xét tự động học cách đánh giá "câu trả lời nào tốt hơn". Sau đó, mô hình ngôn ngữ được tối ưu để maximize điểm từ reward model.

**Điểm mạnh của RLHF:** nắm bắt được những ưu tiên khó diễn đạt thành văn bản mẫu — tone, sắc thái, độ hữu ích tổng thể. Rẻ hơn SFT vì chỉ cần so sánh A/B thay vì viết từ đầu.

**Điểm yếu của RLHF:** reward model có thể bị "hack" — mô hình tìm cách đạt điểm cao mà không thực sự cải thiện chất lượng (*reward hacking*). Phụ thuộc vào bias của người đánh giá. Khó scale khi cần đánh giá các tác vụ chuyên sâu (code, toán).

```
Base model
    │
    ▼
[SFT] ← 100k–1M mẫu hội thoại do người viết
    │
    ▼
[RLHF] ← So sánh A/B → Reward model → Tối ưu hoá
    │
    ▼
Assistant model (ChatGPT, Claude, Gemini...)
```

## 4. Reinforcement Learning thuần túy — khi AI tự vượt qua con người

RLHF vẫn bị giới hạn bởi chất lượng phán đoán của con người. Nếu không ai trong nhóm đánh giá đủ giỏi để nhận ra một bằng chứng toán học sai tinh vi — reward model cũng không học được điều đó.

**RL thuần túy** giải quyết vấn đề này bằng cách chỉ áp dụng cho những bài toán có *đáp án đúng/sai rõ ràng* — toán học, lập trình, cờ vua. Mô hình tự sinh ra nhiều câu trả lời, tự nhận phần thưởng khi đúng, và học từ kết quả — không cần con người chấm từng bước.

Karpathy dùng câu chuyện **AlphaGo** để minh họa sức mạnh của điều này. AlphaGo không chỉ học từ ván cờ của con người — nó tự chơi hàng triệu ván với chính mình và khám phá những nước đi mà không con người nào từng nghĩ tới. **Nước đi 37** trong trận đấu với Lee Sedol là ví dụ kinh điển: máy tính tự tìm ra chiến thuật nằm ngoài 5000 năm cờ vây của nhân loại.

Với LLM, đây là cơ sở của **DeepSeek-R1** và **o1/o3** của OpenAI — các mô hình "suy nghĩ dài" trước khi trả lời.

**Điểm mạnh của RL thuần túy:** có thể vượt qua giới hạn của con người trong các lĩnh vực có tiêu chí đánh giá rõ ràng. DeepSeek-R1 chứng minh rằng chỉ với RL và bài toán toán học, mô hình tự phát triển khả năng "suy nghĩ từng bước" — không cần ai dạy cách làm điều đó.

**Điểm yếu của RL thuần túy:** chỉ hiệu quả khi có oracle rõ ràng (đáp án đúng/sai). Với các tác vụ mờ như "viết email hay hơn" hay "giải thích dễ hiểu hơn" — không có tín hiệu reward khách quan. Có thể dẫn đến các hành vi ngoài ý muốn nếu hàm reward được định nghĩa không chặt.

| | RLHF | RL thuần túy |
|---|---|---|
| **Nguồn reward** | Phán đoán của con người | Kết quả đúng/sai khách quan |
| **Phù hợp với** | Chất lượng hội thoại, sắc thái, safety | Toán, code, game, bài toán có đáp án |
| **Giới hạn** | Bị cap bởi năng lực người đánh giá | Không áp dụng được cho tác vụ mờ |
| **Ví dụ** | ChatGPT alignment | DeepSeek-R1, AlphaGo, o1 |

## 5. Hallucination và bộ nhớ — giới hạn không ai nói cho bạn biết

LLM không có kho dữ liệu để tra cứu. Nó chỉ có các tham số — những con số học được trong quá trình training. Khi bạn hỏi điều gì đó không có trong training data, mô hình vẫn phải sinh ra token tiếp theo. Không có cơ chế nào buộc nó nói "Tôi không biết".

**Hallucination không phải lỗi — đó là hành vi tự nhiên của một mô hình dự đoán văn bản.** Giải pháp là *tool use*: cho phép mô hình gọi công cụ bên ngoài (web search, calculator, database) thay vì dự đoán từ bộ nhớ.

Hai loại bộ nhớ cần phân biệt:

- **Knowledge memory (bộ nhớ dài hạn):** kiến thức được nén vào các tham số trong quá trình training. Tĩnh, không thay đổi sau training.
- **Working memory (context window):** những gì mô hình đang "nhìn thấy" trong cuộc hội thoại hiện tại. Giới hạn bởi context window.

## 6. "Trí tuệ lởm khởm" — AI giỏi toán nhưng mù đếm chữ cái

Karpathy dùng cụm từ *"jagged intelligence"* để mô tả LLM: siêu giỏi một số thứ nhưng kỳ lạ tệ ở những thứ tưởng như đơn giản.

**LLM làm tốt:** lập luận phức tạp, viết code, dịch thuật, tóm tắt, phân tích, giải thích khái niệm, sáng tác.

**LLM hay mắc lỗi:** đếm ký tự trong từ, xử lý chính tả đảo ngược, phép tính số học đơn giản trong đầu, nhận biết thông tin sau ngày cắt training.

Lý do: những thứ LLM tệ thường là những thứ đòi hỏi *thao tác ký tự cấp thấp* — mà tokenization đã che khuất mất. Khi mô hình nhìn vào từ "strawberry" nó không thấy 10 ký tự riêng lẻ — nó thấy vài tokens. Đó là lý do nó đếm sai số chữ "r" trong từ đó.

## 7. Cách dùng LLM hiệu quả hơn

Một số lời khuyên thực tế từ Karpathy:

- **Hãy yêu cầu mô hình suy nghĩ từng bước.** Câu prompt "hãy suy nghĩ từng bước trước khi trả lời" cải thiện đáng kể chất lượng với các câu hỏi phức tạp. Tokens = tư duy.
- **Dùng nhiều mô hình khác nhau và so sánh** — mỗi mô hình có điểm mạnh riêng.
- **Không tin tưởng tuyệt đối** vào bất kỳ câu trả lời nào, đặc biệt về số liệu và sự kiện cụ thể.
- **Cung cấp ngữ cảnh đầy đủ** trong context window — mô hình chỉ biết những gì bạn cho nó thấy.
- **Dùng tool use** (web search, code execution) khi cần độ chính xác cao.

## Tóm tắt — bức tranh toàn cảnh

```
Internet (text thô)
        │  tokenize
        ▼
  Token dataset (~hàng chục nghìn tỉ tokens)
        │  pretraining (GPU × tháng)
        ▼
   Base model — "máy dự đoán văn bản" thông minh
        │
        ├──── SFT ─────────────────────┐
        │    (hội thoại mẫu)           │
        │                              ▼
        └──── RLHF ──────────► Assistant model
             (A/B preference)   (ChatGPT, Claude...)
                  +
             RL thuần túy
             (toán, code — vượt giới hạn người)
```

LLM không phải phép màu — chúng là kết quả của ba bước rõ ràng: **học từ dữ liệu khổng lồ**, **tinh chỉnh để trở thành trợ lý**, và **tối ưu qua phản hồi**. Hiểu được ba bước đó giúp bạn biết khi nào nên tin tưởng AI, khi nào cần kiểm tra lại, và làm thế nào để ra câu hỏi tốt hơn.

---

*Xem video gốc: [youtube.com/watch?v=7xTGNNLPyMI](https://www.youtube.com/watch?v=7xTGNNLPyMI)*
