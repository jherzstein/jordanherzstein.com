;; Set the package installation directory so that packages aren't stored in the
;; ~/.emacs.d/elpa path.
(require 'package)
(require 'cl)
(setq package-user-dir (expand-file-name "./.packages"))
(setq package-archives '(("melpa" . "https://melpa.org/packages/")
			 ("org" . "https://orgmode.org/elpa/")
			 ("gnu-elpa" . "https://elpa.gnu.org/packages/")))
(add-to-list 'load-path "./.packages/org-mode/contrib/lisp/")
(add-to-list 'exec-path "/usr/bin/bibtex2html")
;; Initialize the package system
(package-initialize)
(unless package-archive-contents
  (package-refresh-contents))

;; Install dependencies
;;(package-install 'htmlize)
;;(package-install 'org-ref)
;;(use-package simple-httpd
;;  :ensure t)

;; basic requirements for org-ref usage
(require 'org-ref)
(require 'org-ref-url-utils)

;; export citations (bibtex2html must be installed)
(require 'ox-bibtex)

;; Load publishing system
(require 'ox-publish)
(require 'ox-rss)

;; Customize HTML output
(setq org-html-validation-link nil            ;; Don't show validation link
      org-html-head-include-scripts nil       ;; Use our own scripts
      org-html-head-include-default-style nil ;; Use our own styles
;;      org-html-head "<link rel=\"stylesheet\" type=\"text/css\" href=\"http://thomasf.github.io/solarized-css/solarized-dark.min.css\"/>"
      ;;org-html-head "<link rel=\"stylesheet\" type=\"text/css\" href=\"http://pgaskin.net/style-new.css\"/>"
      ;;org-html-head "<link rel=\"stylesheet\" type=\"text/css\" href=\"https://git.bugswriter.com/website/plain/static/css/style.css\"/>"
;;      org-html-head "<link rel=\"stylesheet\" type=\"text/css\" href=\"https://raw.githubusercontent.com/Bugswriter/akash-raj/master/style.css\"/>"
      org-html-head "<link rel=\"stylesheet\" type=\"text/css\" href=\"/style2.css\" />"
      org-html-head-extra "<style type='text/css'>.title {text-align: center;}</style>") 

(setq org-publish-project-alist
      (list
       (list "Website"
	     :recursive t
	     :base-directory "./content"
	     :publishing-directory "./public"
	     :exclude "feed.org" 
	     :publishing-function 'org-html-publish-to-html
	     :with-author nil
	     :with-creator t
	     :with-toc t
	     :section-numbers nil
	     :time-stamp-file nil)))

(add-to-list 'org-publish-project-alist
             '("blog-rss"
	       :base-directory "./content/blog/"
	       :publishing-directory "./public/blog/"
	       :include("feed.org")
	       :publishing-function (org-rss-publish-to-rss)
	       :html-link-home  "https://jordanherzstein.neocities.org/blog/"
	       :html-link-use-abs-url t
	       :exclude ".*"
	       :html-link-use-abs-url t
	       :rss-extention "xml"))
;; site output
(org-publish-all t)

(message "Build Complete!")
