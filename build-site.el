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
(package-install 'htmlize)
(package-install 'org-ref)
;;(package-install 'org-plus-contrib)
;;(use-package simple-httpd
;;  :ensure t)
;; Load publishing system
(require 'ox-publish)

;; basic requirements for org-ref usage
(require 'org-ref)
(require 'org-ref-url-utils)

;; export citations (bibtex2html must be installed)
(require 'ox-bibtex)

;; Customize HTML output
(setq org-html-validation-link nil            ;; Don't show validation link
      org-html-head-include-scripts nil       ;; Use our own scripts
      org-html-head-include-default-style nil ;; Use our own styles
      org-html-head "<link rel=\"stylesheet\" type=\"text/css\" href=\"http://thomasf.github.io/solarized-css/solarized-dark.min.css\"/>"
      ;;org-html-head "<link rel=\"stylesheet\" type=\"text/css\" href=\"http://pgaskin.net/style-new.css\"/>"
      ;;org-html-head "<link rel=\"stylesheet\" type=\"text/css\" href=\"https://git.bugswriter.com/website/plain/static/css/style.css\"/>"
;;      org-html-head "<link rel=\"stylesheet\" type=\"text/css\" href=\"https://raw.githubusercontent.com/Bugswriter/akash-raj/master/style.css\"/>"
;;      org-html-head "<link rel=\"stylesheet\" type=\"text/css\" href=\"http://0.0.0.0:8080/style.css\"/>"
      org-html-head-extra "<style type='text/css'>.title {text-align: center;}</style>") 

(setq org-publish-project-alist
      (list
       (list "Website"
	     :recursive t
	     :base-directory "./content"
	     :publishing-directory "./public"
	     :publishing-function 'org-html-publish-to-html
	     :with-author nil
	     :with-creator t
	     :with-toc t
	     :section-numbers nil
	     :time-stamp-file nil)))

;; site output
(org-publish-all t)

(message "Build Complete!")
