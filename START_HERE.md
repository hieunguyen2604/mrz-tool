# 🚀 START HERE - MRZ Lab Tool Quick Launch

Welcome! This file will get you up and running in less than 5 minutes.

## ⏱️ 5-Minute Quick Start

### Step 1: Install Dependencies (2 minutes)

Open terminal and run:

```bash
cd /Users/hieunguyen/Source/MRZTool
npm install
```

You'll see progress as packages download. Once complete, you'll see:
```
added 500+ packages
```

### Step 2: Start Development Server (1 minute)

```bash
npm run dev
```

You should see:
```
> next dev
  ▲ Next.js 14.0.0
  - Local:        http://localhost:3000
```

### Step 3: Open Browser (1 minute)

**Go to: http://localhost:3000**

That's it! The app is running! 🎉

---

## 🎮 Try These First

### 1️⃣ Test with Sample Data

1. Click the upload area (top of page)
2. Or drag `sample-data.csv` from your file explorer
3. Watch 5 passports import with MRZ auto-generated ✨

### 2️⃣ Play with the Table

1. Click any cell to edit
2. Change a name or number
3. Watch MRZ update automatically
4. Click "+ Add Row" to create new entries

### 3️⃣ Export Your Data

1. Click "Download Excel" (right panel)
2. Check your Downloads folder
3. Open in Excel to see structured data

### 4️⃣ Validate MRZ

1. Scroll to bottom
2. Paste MRZ lines in validator
3. Click "Validate MRZ"
4. See validation results

---

## 📚 Need More Info?

| Question | Read This |
|----------|-----------|
| How do I use each feature? | [README.md](README.md) |
| Setup takes forever, help! | [TROUBLESHOOTING.md](TROUBLESHOOTING.md) |
| What the heck is MRZ? | [README.md - MRZ Format](README.md#mrz-format) |
| How do I deploy to production? | [DEPLOYMENT.md](DEPLOYMENT.md) |
| I want to understand the code | [STRUCTURE.md](STRUCTURE.md) |

---

## ⚡ Essential Commands

```bash
npm run dev       # Start development server
npm run build     # Create production build
npm run start     # Run production server
npm run lint      # Check code quality
npm install       # Install/update dependencies
```

---

## ✅ What Should Work Now

- ✅ Upload CSV/Excel files
- ✅ Edit data inline in table
- ✅ See MRZ generate in real-time
- ✅ Copy MRZ to clipboard
- ✅ Export to Excel/CSV/TXT
- ✅ Validate MRZ lines
- ✅ Download MRZ as image
- ✅ Handle 100k+ rows smoothly

---

## 🐛 Something Not Working?

### "Can't connect to localhost:3000"
```bash
# Terminal shows an error? Try restarting:
npm run dev
# If port is in use, try:
npm run dev -- -p 3001
```

### "npm: command not found"
Install Node.js from https://nodejs.org first

### "Module not found"
```bash
# Clear and reinstall:
rm -rf node_modules package-lock.json
npm install
npm run dev
```

**Still stuck?** → See [TROUBLESHOOTING.md](TROUBLESHOOTING.md)

---

## 🎯 Next Steps

1. ✅ Get app running (you're here!)
2. → Read [GETTING_STARTED.md](GETTING_STARTED.md) for detailed guide
3. → Explore all features
4. → Read [README.md](README.md) for full documentation
5. → Deploy when ready ([DEPLOYMENT.md](DEPLOYMENT.md))

---

## 📞 Quick Reference

```
Terminal Open?         → npm run dev starts the app
Browser at 3000?       → App is running!
Can't see changes?     → Refresh browser (Cmd+R or Ctrl+R)
Need to stop?          → Press Ctrl+C in terminal
```

---

## 🎉 You're All Set!

Your MRZ Lab Tool is running. Now:

1. **Play around** - Test all the features
2. **Upload data** - Try sample-data.csv
3. **Read docs** - Understand what you have
4. **Customize** - Make it your own
5. **Deploy** - Share with your team

**Happy testing!** 🚀

---

**For detailed information, see:**
- [GETTING_STARTED.md](GETTING_STARTED.md) - Step-by-step guide
- [README.md](README.md) - Complete documentation
- [DEPLOYMENT.md](DEPLOYMENT.md) - Production deployment
